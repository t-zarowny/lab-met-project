import { InstrumentService } from 'src/app/_services';
import { CertificateService } from './../_services/certificate.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrumentFull } from '../_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.css']
})
export class CertificateDialogComponent implements OnInit {

  certificateForm: FormGroup;
  instrument: InstrumentFull;
  instrumentDataLoaded = false;
  isInternalCheck: 'intern' | 'extern' = 'intern';
  allInstrumentPattern: InstrumentFull[];
  instrumentPattern = '';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  InstrumentPatternCtrl = new FormControl();

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private instrumentService: InstrumentService,
              private certificateService: CertificateService) { }

  get wilgotnosc() { return this.certificateForm.get('wilgotnosc'); }

  ngOnInit(): void {
    this.instrumentService.get(this.data).subscribe( d => {
      this.instrument = d;
      this.instrumentService.getAllPattern().subscribe( dp => {
        this.allInstrumentPattern = dp;
        this.instrumentDataLoaded = true;
      });
    });
    this.dialogRef.updateSize('800px', '800px');
    this.certificateForm = new FormGroup({
      rodzaj: new FormControl(this.isInternalCheck),
      metoda_sprawdzenia: new FormControl(null),
      temperatura: new FormControl(null),
      wilgotnosc: new FormControl(null, [
        Validators.min(0),
        Validators.max(100)
      ]),
    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
  onChangeSelect(){
    this.instrumentPattern = '';
    this.certificateForm.get('metoda_sprawdzenia').value.forEach(element => {
      this.instrumentPattern = this.instrumentPattern.length > 0 ? this.instrumentPattern + ', ' : '';
      const instr: InstrumentFull = this.allInstrumentPattern.find(ins => ins.id === element);
      const nrGroup = '0' + instr.idGrupa.nrGrupy;
      const nrInstr = '00' + instr.id;
      this.instrumentPattern = this.instrumentPattern + 'ZPL.' + nrGroup.slice(-2) + '.' + nrInstr.slice(-3);
    });
  }
  onSubmit(){

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
