import { AuthenticationService } from 'src/app/login/_services';
import { DateAssistant } from './../_helpers/dateAssistant';
import { InstrumentService } from 'src/app/_services';
import { CertificateService } from './../_services/certificate.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrumentFull } from '../_models';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';



@Component({
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.css']
})
export class CertificateDialogComponent implements OnInit {

  certificateForm: FormGroup;
  instrument: InstrumentFull;
  certificateNr = '';
  instrumentDataLoaded = false;
  typeCheck: 'intern' | 'extern' = 'intern';
  isInternType = true;
  allInstrumentPattern: InstrumentFull[];
  instrumentPattern = '';
  today: Date;
  nextDate: Date;
  fileMeasurmentCard: FormGroup;
  isNewMeasurmentCardFile = false;
  isValid = false;


  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private instrumentService: InstrumentService,
              private certificateService: CertificateService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private auth: AuthenticationService) {
                this.today = new Date();
                this.nextDate = new Date();
              }

  get wilgotnosc() { return this.certificateForm.get('wilgotnosc'); }
  get temperatura() { return this.certificateForm.get('temperatura'); }
  get uzyte_wzorce() { return this.certificateForm.get('uzyte_wzorce'); }
  get data_nast_kontroli() { return this.certificateForm.get('data_nast_kontroli'); }
  get data_sprawdzenia() { return this.certificateForm.get('data_sprawdzenia'); }
  get wynik() { return this.certificateForm.get('wynik'); }
  get kartaPomiarowNazwa() { return this.fileMeasurmentCard.get('kartaPomiarowNazwa').value; }
  get kartaPomiarowLink() { return this.fileMeasurmentCard.get('kartaPomiarowLink').value; }

  ngOnInit(): void {
    this.dialogRef.updateSize('800px', '850px');
    this.dialogRef.updatePosition({top: '30px'});
    this.certificateForm = new FormGroup({
      rodzaj: new FormControl(this.typeCheck),
      uzyte_wzorce: new FormControl(null, [
        Validators.required
      ]),
      temperatura: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(50)
      ]),
      wilgotnosc: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),
      data_sprawdzenia: new FormControl(this.today),
      data_nast_kontroli: new FormControl({value: this.nextDate}),
      wynik: new FormControl(null, [
        Validators.required
      ]),
    });

    this.fileMeasurmentCard = this.formBuilder.group({
      kartaPomiarowNazwa: [null],
      kartaPomiarowLink: [null]
    });

    this.refreshNextCertificateNr();

    this.instrumentService.get(this.data).subscribe( d => {
      this.instrument = d;
      this.instrumentService.getAllPattern().subscribe( dp => {
        this.allInstrumentPattern = dp;
        this.instrumentDataLoaded = true;
        this.certificateForm.controls.data_nast_kontroli.setValue(DateAssistant.makeNextDate(this.instrument.idGrupa));
      });
    });
    this.certificateForm.controls.data_sprawdzenia.valueChanges.subscribe(query => {
      this.certificateForm.controls.data_nast_kontroli
      .setValue(DateAssistant.makeNextDate(this.instrument.idGrupa, query));
    });
    this.certificateForm.controls.rodzaj.valueChanges.subscribe(query => {
      this.isInternType = query === 'intern' ? true : false;
    });
    this.certificateForm.valueChanges.subscribe(query => {
      this.checkValid();
    });
    // console.log(this.auth.currentUserValue.first_name + this.auth.currentUserValue.last_name);
  }
  onNoClick(){
    this.dialogRef.close();
  }
  onChangeSelect(){
    this.instrumentPattern = '';
    this.certificateForm.get('uzyte_wzorce').value.forEach(element => {
      this.instrumentPattern = this.instrumentPattern.length > 0 ? this.instrumentPattern + ', ' : '';
      const instr: InstrumentFull = this.allInstrumentPattern.find(ins => ins.id === element);
      const nrGroup = '0' + instr.idGrupa.nrGrupy;
      const nrInstr = '00' + instr.id;
      this.instrumentPattern = this.instrumentPattern + 'ZPL.' + nrGroup.slice(-2) + '.' + nrInstr.slice(-3);
    });
  }
  onSubmit(){
    this.refreshNextCertificateNr();
    const nrGroup = '0' + this.instrument.idGrupa.nrGrupy;
    const nrInstr = '00' + this.instrument.id;
    const przedmiot = 'Nr ewidencyjny: ZPL.' + nrGroup.slice(-2) + '.' + nrInstr.slice(-3) + '<br>' +
                      'Nazwa: ' + this.instrument.nazwa + '<br>' +
                      'Typ: ' + this.instrument.typ + '<br>' +
                      'Nr fabryczny: ' + this.instrument.nrFabryczny + ', ' +
                      'Zakres pomiarowy: ' + this.instrument.zakres;
    const warunki = 'Temperatura: ' + this.temperatura.value + ' &#8451; <br>' +
                    'Wilgotność: ' + this.wilgotnosc.value + '%';
    const certFormData = new FormData();
    certFormData.append('nrSwiadectwa', this.certificateNr);
    certFormData.append('przedmiot', przedmiot);
    certFormData.append('przedmiotId', this.instrument.id.toString());
    certFormData.append('metoda', this.instrument.idGrupa.metodaKontroli);
    certFormData.append('uzyteWzorce', this.uzyte_wzorce.value);
    certFormData.append('warunkiSrodowiskowe', warunki);
    certFormData.append('dataSprawdzenia', this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy-MM-dd'));
    certFormData.append('dataNastepnejKontroli', this.datePipe.transform(this.data_nast_kontroli.value, 'yyyy-MM-dd'));
    certFormData.append('wynikSprawdzenia', this.wynik.value ? 'true' : 'false');
    certFormData.append('sprawdzenieZewnetrzne', this.isInternType ? 'false' : 'true');
    certFormData.append('uwagi', 'brak');
    certFormData.append('sprawdzajacy', this.auth.currentUserValue.first_name + ' ' + this.auth.currentUserValue.last_name);

    this.certificateService.add(certFormData).subscribe( data => {
        this.snackBar.open('Zapisano świadectwo nr ' + data.nrSwiadectwa, 'Zamknij', {
          duration: 5000
        });
        this.saveNewFile(data.id);
        console.log(data);
        this.dialogRef.close();
    });

    // console.log(this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy/MM/dd'));

  }
  refreshNextCertificateNr(): void {
    this.certificateService.getAllNr().subscribe( data => {
      let preNr = 0;
      // console.log(data);
      const currYear = new Date().getFullYear();
      data.forEach(val => {
      // tslint:disable-next-line: prefer-const
      let valSplit = val.nrSwiadectwa.split('/');
      // tslint:disable-next-line: prefer-const
      let valYear = +valSplit[1];
      if (valYear === currYear){
        preNr = preNr < +valSplit[0] ? +valSplit[0] : preNr;
        // console.log('prawda');
      }
      // console.log('currYear: ' + currYear);
      // console.log('0: ' + valSplit[0]);
      // console.log('1: ' + valSplit[1]);
      // console.log('preNr1: ' + preNr);
      });
      preNr++;
      // console.log('preNr2: ' + preNr);
      this.certificateNr = preNr + '/' + currYear;
    });
  }
  checkValid(){
    this.isValid = (this.certificateForm.valid && this.isNewMeasurmentCardFile) ? true : false;
    // console.log('file: ' + this.isNewMeasurmentCardFile);
    // console.log('form: ' + this.certificateForm.valid);
  }

  handleFileInput(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileMeasurmentCard.get('kartaPomiarowLink').setValue(file);
      this.fileMeasurmentCard.patchValue({kartaPomiarowNazwa: event.target.files[0].name});
      this.isNewMeasurmentCardFile = true;
      this.checkValid();
      // this.kartaPomiarowNazwa = event.target.files[0].name;
      // this.kartaPomiarowLink = null;
      // console.log(this.fileMeasurmentCard);
    }
  }
  downloadFile(){
    const link = document.createElement('a');
    link.download = this.instrument.idGrupa.karta[0].nazwa;
    link.href = this.instrument.idGrupa.karta[0].link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
    console.log(this.instrument.idGrupa);
  }
  deleteFile(){
    this.fileMeasurmentCard.get('kartaPomiarowNazwa').setValue(null);
    this.fileMeasurmentCard.get('kartaPomiarowLink').setValue(null);
    this.isNewMeasurmentCardFile = false;
    this.checkValid();
  }
  saveNewFile(certId: number){
    if (this.isNewMeasurmentCardFile){
      const formFile = new FormData();
      formFile.append('nazwa', this.kartaPomiarowNazwa);
      formFile.append('link', this.kartaPomiarowLink);
      formFile.append('idSwiadectwoSprawdzenia', certId.toString());
      this.certificateService.addFile(formFile).subscribe();
      // console.log(`groupFormFile:`);
      // console.log(groupFormFile.forEach);
    }
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.instrumentPattern.push(value.trim());
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }

  //   this.InstrumentPatternCtrl.setValue(null);
  // }

  // remove(fruit: string): void {
  //   const index = this.instrumentPattern.indexOf(fruit);

  //   if (index >= 0) {
  //     this.instrumentPattern.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.instrumentPattern.push(event.option.viewValue);
  //   this.fruitInput.nativeElement.value = '';
  //   this.InstrumentPatternCtrl.setValue(null);
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allInstrumentPattern.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  // }

}
