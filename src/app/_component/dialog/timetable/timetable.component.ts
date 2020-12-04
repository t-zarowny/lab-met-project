import { FormGroup, FormControl } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GroupInstrument } from './../../../_models/group';
import { GroupService } from './../../../_services/group.service';
import { Inspection } from './../../../_models/inspection';
import { Instrument } from './../../../_models/instrument';
import { InstrumentService } from 'src/app/_services';
import { CertificateService } from './../../../_services/certificate.service';
import { Component, Inject, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, DoCheck, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add, subtract } from 'add-subtract-date';
import { DatePipe } from '@angular/common';
import { DateAssistant } from 'src/app/_helpers';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewChecked } from '@angular/core';
// declare var jsPDF: any;
// import * from 'jspdf';
// import 'jspdf-autotable';
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
  yearsList: Array<Date> = [];
  instrumentList: Instrument[];
  groupList: GroupInstrument[];
  // displayedColumns: string[] = ['nrString', 'nazwa', 'nrFabryczny', 'styczen', 'luty', 'marzec',
  // 'kwiecien', 'maj', 'czerwiec', 'lipiec', 'sierpien', 'wrzesien', 'pazdziernik', 'listopad', 'grudzien'];
  displayedColumns: string[] = ['nrString', 'nazwa', 'nrFabryczny'];
  dataSource: MatTableDataSource<Instrument>;
  readyToView = false;


  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private certificateService: CertificateService,
              private instrumentService: InstrumentService,
              private groupService: GroupService,
              private datePipe: DatePipe) {
    // this.dataSource = new MatTableDataSource<Instrument>(this.instrumentList);
    this.dataSource = new MatTableDataSource(Array<Instrument>());
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
    // console.log(this.yearsList);
    this.groupService.getList().subscribe( group => {
      this.groupList = group;
      // console.log('załadowałem grupy');
      this.yearForm.controls.year.valueChanges.subscribe( val => {
        this.readyToView = false;
        // console.log('była zmiana1');
        // console.log(val);
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


    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    // // doc.autoTable({ html: '#contentToConvert' });
    // let doc = new jsPDF('l', 'pt');
    // // doc.autoTable({ html: '#contentToConvert' });
    // let columns = ["ID", "Name", "Country"];
    // let rows = [
    //     [1, "Shaw", "Tanzania"],
    //     [2, "Nelson", "Kazakhstan"],
    //     [3, "Garcia", "Madagascar"],
    // ];


    // doc.autoTable(columns, rows); // typescript compile time error
    // doc.save('table.pdf');

    // var data = document.getElementById('contentToConvert');
    // html2canvas(data).then(canvas => {
    //   var imgWidth = 208;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/png');
    //   let pdf = new jsPDF('l', 'mm', 'a4');
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('newPDF.pdf');
    // });
  }

  public refresh(){
    // console.log('refresh:');
    // console.log(this.selectedValue);
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
            const day = this.datePipe.transform(d, 'dd')  + ', ';
            this.pushDateToInstrument(d, instrElement);
          });

          if (instrElement.dataNastepnejKontroli){
            this.propDate(grupa[0], this.startDate, new Date(instrElement.dataNastepnejKontroli), this.endDate).forEach( el => {
              // instrElement.sprawdzeniaPlanowe.push(el);
              this.pushDateToInstrument(el.dataPlanowa, instrElement, true);
            });
          }
          const nrGrupy = '0' + grupa[0].nrGrupy;
          const nrPrzyrz = '000' + instrElement.nr;
          instrElement.nrString = 'ZPL.' + nrGrupy.slice(-2) + '.' + nrPrzyrz.slice(-4);
        });
        console.log(this.instrumentList);
        // console.log(cert);
        this.dataSource.data = this.instrumentList;
        this.readyToView = true;

      });
    });
  }

  pushDateToInstrument(date: Date, instr: Instrument, prop = false){
    const d = new Date(date);
    let day = '';
    if (prop){
      day = '(' + this.datePipe.transform(d, 'dd')  + '), ';
    }else{
      day = this.datePipe.transform(d, 'dd')  + ', ';
    }
    switch (d.getMonth()){
      case 0: {
        instr.sprawdzeniaPlanoweSty = instr.sprawdzeniaPlanoweSty + day;
        break;
              }
      case 1: {
        instr.sprawdzeniaPlanoweLut = instr.sprawdzeniaPlanoweLut + day;
        break;
              }
      case 2: {
        instr.sprawdzeniaPlanoweMar = instr.sprawdzeniaPlanoweMar + day;
        break;
              }
      case 3: {
        instr.sprawdzeniaPlanoweKwi = instr.sprawdzeniaPlanoweKwi + day;
        break;
              }
      case 4: {
        instr.sprawdzeniaPlanoweMaj = instr.sprawdzeniaPlanoweMaj + day;
        break;
              }
      case 5: {
        instr.sprawdzeniaPlanoweCze = instr.sprawdzeniaPlanoweCze + day;
        break;
              }
      case 6: {
        instr.sprawdzeniaPlanoweLip = instr.sprawdzeniaPlanoweLip + day;
        break;
              }
      case 7: {
        instr.sprawdzeniaPlanoweSie = instr.sprawdzeniaPlanoweSie + day;
        break;
              }
      case 8: {
        instr.sprawdzeniaPlanoweWrz = instr.sprawdzeniaPlanoweWrz + day;
        break;
              }
      case 9: {
        instr.sprawdzeniaPlanowePaz = instr.sprawdzeniaPlanowePaz + day;
        break;
              }
      case 10: {
        instr.sprawdzeniaPlanoweLis = instr.sprawdzeniaPlanoweLis + day;
        break;
              }
      case 11: {
        instr.sprawdzeniaPlanoweGru = instr.sprawdzeniaPlanoweGru + day;
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
