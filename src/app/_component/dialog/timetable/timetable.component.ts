import { FormGroup, FormControl } from '@angular/forms';
import { GroupInstrument } from './../../../_models/group';
import { GroupService } from './../../../_services/group.service';
import { Inspection } from './../../../_models/inspection';
import { Instrument } from './../../../_models/instrument';
import { InstrumentService } from 'src/app/_services';
import { CertificateService } from './../../../_services/certificate.service';
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add } from 'add-subtract-date';
import { DatePipe } from '@angular/common';
import { DateAssistant } from 'src/app/_helpers';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  yearForm: FormGroup;
  selectedValue: Date;
  selectedGroup: GroupInstrument;
  yearsList: Array<Date> = [];
  instrumentList: Instrument[];
  groupList: GroupInstrument[];
  displayedColumns: string[] = ['nrString', 'nazwa', 'nrFabryczny'];
  readyToView = false;


  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private certificateService: CertificateService,
              private instrumentService: InstrumentService,
              private groupService: GroupService,
              private datePipe: DatePipe) {
  }

  get year() { return this.yearForm.get('year'); }

  ngOnInit(): void {
    this.dialogRef.updateSize('1000px', '800px');
    this.dialogRef.updatePosition({top: '30px'});
    this.yearForm = new FormGroup({
      year: new FormControl(new Date())
    });
    const dateStart = new Date('2020-01-01');
    const dateCurr = new Date();
    const years = Math.floor((dateCurr.getTime() - dateStart.getTime()) / 1000 / 60 / 60 / 24 / 365);
    let d = new Date(dateStart.getTime());
    this.selectedValue = d;
    this.startDate = this.selectedValue;
    for (let i = 0; i < 11 + years; i++){
      this.yearsList.push(d);
      d = new Date(d.getTime());
      add(d, 1, 'year');
    }
    this.groupService.getList().subscribe( group => {
      this.groupList = group;
      this.yearForm.controls.year.valueChanges.subscribe( val => {
        this.readyToView = false;
        this.selectedValue = val;
        // setTimeout(() => {
        //   this.refresh();
        // }, 100);
        this.refresh();
      });
      this.year.setValue(this.selectedValue);
      // console.log(this.selectedValue);
    });

  }

  getPDF(){
    this.instrumentService.downloadTimetable(this.instrumentList, this.selectedValue.getFullYear().toString());
  }

  public refresh(){
    this.startDate = this.selectedValue;
    this.endDate = new Date(this.selectedValue.getFullYear() + '-12-31');
    const param = '?max_st=3';
    this.instrumentService.getAllTimetab(param).subscribe(instr => {
      this.instrumentList = instr;
      this.certificateService.getBetweenDates(this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
      this.datePipe.transform(this.endDate, 'yyyy-MM-dd'))
      .subscribe( cert => {
        this.instrumentList.forEach( instrElement => {
          const grupa = this.groupList.filter(x => x.id === instrElement.idGrupa);
          instrElement.sprawdzeniaPlanowe = new Array<Inspection>();
          instrElement.sprawdzeniaPlanoweSty = '';
          instrElement.sprawdzeniaPlanoweLut = '';
          instrElement.sprawdzeniaPlanoweMar = '';
          instrElement.sprawdzeniaPlanoweKwi = '';
          instrElement.sprawdzeniaPlanoweMaj = '';
          instrElement.sprawdzeniaPlanoweCze = '';
          instrElement.sprawdzeniaPlanoweLip = '';
          instrElement.sprawdzeniaPlanoweSie = '';
          instrElement.sprawdzeniaPlanoweWrz = '';
          instrElement.sprawdzeniaPlanowePaz = '';
          instrElement.sprawdzeniaPlanoweLis = '';
          instrElement.sprawdzeniaPlanoweGru = '';
          const certFilter = cert.filter(x => x.przedmiotId.id === instrElement.id);
          certFilter.forEach( certElement => {
            const d = new Date(certElement.dataSprawdzenia);
            this.pushDateToInstrument(d, instrElement);
          });

          if (instrElement.dataNastepnejKontroli){
            this.propDate(grupa[0], this.startDate, new Date(instrElement.dataNastepnejKontroli), this.endDate).forEach( el => {
              this.pushDateToInstrument(el.dataPlanowa, instrElement, true);
            });
          }
          const nrGrupy = '0' + grupa[0].nrGrupy;
          const nrPrzyrz = '000' + instrElement.nr;
          instrElement.nrString = 'ZPL.' + nrGrupy.slice(-2) + '.' + nrPrzyrz.slice(-4);
        });
        // console.log(this.instrumentList);
        this.readyToView = true;
      });
    });
  }

  pushDateToInstrument(date: Date, instr: Instrument, prop = false){
    const d = new Date(date);
    let day = '';
    if (prop){
      day = '(' + this.datePipe.transform(d, 'dd')  + '),';
    }else{
      day = this.datePipe.transform(d, 'dd')  + ',';
    }
    switch (d.getMonth()){
      case 0: {
        instr.sprawdzeniaPlanoweSty = instr.sprawdzeniaPlanoweSty.length > 2 ?
          instr.sprawdzeniaPlanoweSty + ' ' + day : instr.sprawdzeniaPlanoweSty + day;
        break;
              }
      case 1: {
        instr.sprawdzeniaPlanoweLut = instr.sprawdzeniaPlanoweLut.length > 2 ?
          instr.sprawdzeniaPlanoweLut + ' ' + day : instr.sprawdzeniaPlanoweLut + day;
        break;
              }
      case 2: {
        instr.sprawdzeniaPlanoweMar = instr.sprawdzeniaPlanoweMar.length > 2 ?
          instr.sprawdzeniaPlanoweMar + ' ' + day : instr.sprawdzeniaPlanoweMar + day;
        break;
              }
      case 3: {
        instr.sprawdzeniaPlanoweKwi = instr.sprawdzeniaPlanoweKwi.length > 2 ?
          instr.sprawdzeniaPlanoweKwi + ' ' + day : instr.sprawdzeniaPlanoweKwi + day;
        break;
              }
      case 4: {
        instr.sprawdzeniaPlanoweMaj = instr.sprawdzeniaPlanoweMaj.length > 2 ?
          instr.sprawdzeniaPlanoweMaj + ' ' + day : instr.sprawdzeniaPlanoweMaj + day;
        break;
              }
      case 5: {
        instr.sprawdzeniaPlanoweCze = instr.sprawdzeniaPlanoweCze.length > 2 ?
          instr.sprawdzeniaPlanoweCze + ' ' + day : instr.sprawdzeniaPlanoweCze + day;
        break;
              }
      case 6: {
        instr.sprawdzeniaPlanoweLip = instr.sprawdzeniaPlanoweLip.length > 2 ?
          instr.sprawdzeniaPlanoweLip + ' ' + day : instr.sprawdzeniaPlanoweLip + day;
        break;
              }
      case 7: {
        instr.sprawdzeniaPlanoweSie = instr.sprawdzeniaPlanoweSie.length > 2 ?
          instr.sprawdzeniaPlanoweSie + ' ' + day : instr.sprawdzeniaPlanoweSie + day;
        break;
              }
      case 8: {
        instr.sprawdzeniaPlanoweWrz = instr.sprawdzeniaPlanoweWrz.length > 2 ?
          instr.sprawdzeniaPlanoweWrz + ' ' + day : instr.sprawdzeniaPlanoweWrz + day;
        break;
              }
      case 9: {
        instr.sprawdzeniaPlanowePaz = instr.sprawdzeniaPlanowePaz.length > 2 ?
          instr.sprawdzeniaPlanowePaz + ' ' + day : instr.sprawdzeniaPlanowePaz + day;
        break;
              }
      case 10: {
        instr.sprawdzeniaPlanoweLis = instr.sprawdzeniaPlanoweLis.length > 2 ?
          instr.sprawdzeniaPlanoweLis + ' ' + day : instr.sprawdzeniaPlanoweLis + day;
        break;
              }
      case 11: {
        instr.sprawdzeniaPlanoweGru = instr.sprawdzeniaPlanoweGru.length > 2 ?
          instr.sprawdzeniaPlanoweGru + ' ' + day : instr.sprawdzeniaPlanoweGru + day;
        break;
              }
    }
  }

  propDate(grupa: GroupInstrument, firstDate: Date, dataStart: Date, dataEnd: Date): Inspection[]{
    const propDateList = new Array<Inspection>();
    while (dataStart <= dataEnd) {
      if (dataStart >= this.startDate){
        propDateList.push({dataPlanowa: dataStart});
      }
      dataStart = DateAssistant.makeNextDate(grupa, dataStart);
    }
    return propDateList;
  }

  onNoClick(){
    this.dialogRef.close();
  }
  yearSelected(eventData: any, picker?: any) {
    picker.close();
  }

}
