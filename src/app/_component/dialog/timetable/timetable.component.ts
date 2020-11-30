import { GroupInstrument } from './../../../_models/group';
import { GroupService } from './../../../_services/group.service';
import { Inspection } from './../../../_models/inspection';
import { Instrument } from './../../../_models/instrument';
import { InstrumentService } from 'src/app/_services';
import { Certificate } from './../../../_models/certificate';
import { CertificateService } from './../../../_services/certificate.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add, subtract } from 'add-subtract-date';
import { DatePipe } from '@angular/common';
import { DateAssistant } from 'src/app/_helpers';

@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  selectedValue: Date;
  yearsList: Array<Date> = [];
  instrumentList: Instrument[];
  groupList: GroupInstrument[];
  propDateList: Inspection[];

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private certificateService: CertificateService,
              private instrumentService: InstrumentService,
              private groupService: GroupService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('1000px', '800px');
    this.dialogRef.updatePosition({top: '30px'});
    const dateStart = new Date('2020-01-01');
    const dateCurr = new Date();
    const years = Math.floor((dateCurr.getTime() - dateStart.getTime()) / 1000 / 60 / 60 / 24 / 365);
    let d = new Date(dateStart.getTime());
    this.selectedValue = d;
    for (let i = 0; i < 11 + years; i++){
      this.yearsList.push(d);
      d = new Date(d.getTime());
      add(d, 1, 'year');
    }
    // console.log(this.yearsList);
    this.groupService.getList().subscribe( group => {
      this.groupList = group;
      this.refresh();
    });
  }
  refresh(){
    console.log('refresh:');
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
          const certFilter = cert.filter(x => x.przedmiotId.id === instrElement.id);
          certFilter.forEach( certElement => {
            instrElement.sprawdzeniaPlanowe.push({dataPlanowa: certElement.dataSprawdzenia, nrSwiadectwa: certElement.nrSwiadectwa});
          });
          if (instrElement.dataNastepnejKontroli){
            this.propDate(grupa[0], this.startDate, new Date(instrElement.dataNastepnejKontroli), this.endDate).forEach( el => {
              instrElement.sprawdzeniaPlanowe.push(el);
            });
          }
        });
        console.log(this.instrumentList);
        console.log(cert);
      });
    });
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
