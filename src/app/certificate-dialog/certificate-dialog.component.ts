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
  fileDocument: FormGroup;
  isNewDocumentFile = false;
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
  get uwagi() { return this.certificateForm.get('uwagi'); }
  get kartaPomiarowNazwa() { return this.fileMeasurmentCard.get('kartaPomiarowNazwa').value; }
  get kartaPomiarowLink() { return this.fileMeasurmentCard.get('kartaPomiarowLink').value; }
  get kartaPomiarowNazwaDoc() { return this.fileDocument.get('kartaPomiarowNazwa').value; }
  get kartaPomiarowLinkDoc() { return this.fileDocument.get('kartaPomiarowLink').value; }

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
      uwagi: new FormControl(null),
      wynik: new FormControl(null, [
        Validators.required
      ]),
    });

    this.fileMeasurmentCard = this.formBuilder.group({
      kartaPomiarowNazwa: [null],
      kartaPomiarowLink: [null]
    });

    this.fileDocument = this.formBuilder.group({
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
        // console.log(this.instrument);
        // let dateString = '2020-10-05';
        // let newDate = new Date(dateString);
        // console.log(newDate);
      });
    });
    this.certificateForm.controls.data_sprawdzenia.valueChanges.subscribe(query => {
      this.certificateForm.controls.data_nast_kontroli
      .setValue(DateAssistant.makeNextDate(this.instrument.idGrupa, query));
    });
    this.certificateForm.controls.rodzaj.valueChanges.subscribe(query => {
      this.isInternType = query === 'intern' ? true : false;
      this.setValidators();
    });
    this.certificateForm.valueChanges.subscribe(query => {
      this.checkValid();
    });
    // console.log(this.auth.currentUserValue.first_name + this.auth.currentUserValue.last_name);

  }
  setValidators(){
    if (this.isInternType){
      this.uzyte_wzorce.setValidators([Validators.required]);
      this.temperatura.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(50)
      ]);
      this.wilgotnosc.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]);
    }else{
      this.uzyte_wzorce.setValidators(null);
      this.temperatura.setValidators(null);
      this.wilgotnosc.setValidators(null);
    }
    this.uzyte_wzorce.updateValueAndValidity();
    this.temperatura.updateValueAndValidity();
    this.wilgotnosc.updateValueAndValidity();
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
      const nrInstr = '000' + instr.nr;
      this.instrumentPattern = this.instrumentPattern + 'ZPL.' + nrGroup.slice(-2) + '.' + nrInstr.slice(-4);
    });
  }
  onSubmit(){
    this.refreshNextCertificateNr();
    const zakres = this.instrument.zakres ? this.instrument.zakres : '-';
    const nrfabr = this.instrument.nrFabryczny ? this.instrument.nrFabryczny : '-';
    const typ = this.instrument.typ ? this.instrument.typ : '-';
    const nrGroup = '0' + this.instrument.idGrupa.nrGrupy;
    const nrInstr = '000' + this.instrument.nr;
    const przedmiot = 'Nr ewidencyjny: ZPL.' + nrGroup.slice(-2) + '.' + nrInstr.slice(-4) + '<br>' +
                      'Nazwa: ' + this.instrument.nazwa + '<br>' +
                      'Typ: ' + typ + '<br>' +
                      'Nr fabryczny: ' + nrfabr + ', ' +
                      'Zakres pomiarowy: ' + zakres;
    const warunki = 'Temperatura: ' + this.temperatura.value + '<br>' +
                    'Wilgotność: ' + this.wilgotnosc.value + '%';
    const certFormData = new FormData();
    certFormData.append('nrSwiadectwa', this.certificateNr);
    certFormData.append('przedmiot', przedmiot);
    certFormData.append('przedmiotId', this.instrument.id.toString());
    certFormData.append('metoda', this.instrument.idGrupa.metodaKontroli);
    // certFormData.append('uzyteWzorce', this.uzyte_wzorce.value);
    certFormData.append('uzyteWzorce', this.instrumentPattern);
    certFormData.append('warunkiSrodowiskowe', warunki);
    certFormData.append('dataSprawdzenia', this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy-MM-dd'));
    certFormData.append('dataNastepnejKontroli', this.datePipe.transform(this.data_nast_kontroli.value, 'yyyy-MM-dd'));
    certFormData.append('wynikSprawdzenia', this.wynik.value ? 'true' : 'false');
    certFormData.append('sprawdzenieZewnetrzne', this.isInternType ? 'false' : 'true');
    certFormData.append('uwagi', this.uwagi.value ? this.uwagi.value : 'Brak uwag');
    certFormData.append('sprawdzajacy', this.auth.currentUserValue.first_name + ' ' + this.auth.currentUserValue.last_name);

    this.certificateService.add(certFormData).subscribe( data => {
        this.snackBar.open('Zapisano świadectwo nr ' + data.nrSwiadectwa, 'Zamknij', {
          duration: 5000
        });
        if (this.isInternType){
          this.saveNewFile(data.id);
        }else{
          this.saveNewDocFile(data.id);
        }
        const nextDateNew = new Date(this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy-MM-dd'));
        const instrFormData = new FormData();
        instrFormData.append('dataOstatniejKontroli', this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy-MM-dd'));
        instrFormData.append('dataNastepnejKontroli', this.datePipe.transform(this.data_nast_kontroli.value, 'yyyy-MM-dd'));
        instrFormData.append('nrAktualnegoSwiadectwa', this.certificateNr);
        if (this.instrument.dataNastepnejKontroli != null){
          const nextDateOld = new Date(this.instrument.dataNastepnejKontroli);
          if (nextDateNew > nextDateOld){
            this.instrumentService.updateDate(this.instrument.id, instrFormData).subscribe();
          }
        }else{
          this.instrumentService.updateDate(this.instrument.id, instrFormData).subscribe();
        }
        console.log(data);
        this.dialogRef.close();
    });

    // console.log(this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy/MM/dd'));

  }
  refreshNextCertificateNr(): void {
    this.certificateService.getLastNr().subscribe( data => {
      let preNr = 0;
      // console.log(data);
      const currYear = new Date().getFullYear();
      // tslint:disable-next-line: prefer-const
      let valSplit = data.nrSwiadectwa.split('/');
      // tslint:disable-next-line: prefer-const
      let valYear = +valSplit[1];
      if (valYear === currYear){
        preNr = preNr < +valSplit[0] ? +valSplit[0] : preNr;
      }
      preNr++;
      this.certificateNr = preNr + '/' + currYear;
    });
  }
  checkValid(){
    if (this.isInternType){
      this.isValid = (this.certificateForm.valid && this.isNewMeasurmentCardFile) ? true : false;
    }else{
      this.isValid = (this.certificateForm.valid && this.isNewDocumentFile) ? true : false;
    }
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
  handleFileInputDoc(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileDocument.get('kartaPomiarowLink').setValue(file);
      this.fileDocument.patchValue({kartaPomiarowNazwa: event.target.files[0].name});
      this.isNewDocumentFile = true;
      this.checkValid();
      // this.kartaPomiarowNazwa = event.target.files[0].name;
      // this.kartaPomiarowLink = null;
      // console.log(this.fileMeasurmentCard);
    }
  }
  downloadFile(){
    const link = document.createElement('a');
    link.download = this.instrument.idGrupa.karta[0].nazwa;
    this.certificateService.downloadFile(this.instrument.idGrupa.karta[0].link).subscribe( blob => {
      // link.href = this.instrument.idGrupa.karta[0].link;
      link.href = URL.createObjectURL(blob);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      // console.log(this.instrument.idGrupa);
    });
  }
  deleteFile(){
    this.fileMeasurmentCard.get('kartaPomiarowNazwa').setValue(null);
    this.fileMeasurmentCard.get('kartaPomiarowLink').setValue(null);
    this.isNewMeasurmentCardFile = false;
    this.checkValid();
  }
  deleteFileDoc(){
    this.fileDocument.get('kartaPomiarowNazwa').setValue(null);
    this.fileDocument.get('kartaPomiarowLink').setValue(null);
    this.isNewDocumentFile = false;
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
  saveNewDocFile(certId: number){
    if (this.isNewDocumentFile){
      const formFile = new FormData();
      formFile.append('nazwa', this.kartaPomiarowNazwaDoc);
      formFile.append('link', this.kartaPomiarowLinkDoc);
      formFile.append('idSwiadectwoSprawdzenia', certId.toString());
      this.certificateService.addFile(formFile).subscribe();
      // console.log(`groupFormFile:`);
      // console.log(groupFormFile.forEach);
    }
  }

}
