import { FormGroup, FormControl } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GroupInstrument } from './../../../_models/group';
import { GroupService } from './../../../_services/group.service';
import { Inspection } from './../../../_models/inspection';
import { Instrument } from './../../../_models/instrument';
import { InstrumentService } from 'src/app/_services';
import { CertificateService } from './../../../_services/certificate.service';
import { Component, Inject, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add, subtract } from 'add-subtract-date';
import { DatePipe } from '@angular/common';
import { DateAssistant } from 'src/app/_helpers';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewChecked } from '@angular/core';

@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private certificateService: CertificateService,
              private instrumentService: InstrumentService,
              private groupService: GroupService,
              private datePipe: DatePipe) {
    // this.dataSource = new MatTableDataSource<Instrument>(this.instrumentList);
    this.dataSource = new MatTableDataSource(Array<Instrument>());
  }

  ngAfterViewInit(): void {
    // this.paginator._intl.itemsPerPageLabel = 'Wyników na stronie:';
    this.dataSource.paginator = this.paginator;
    console.log('AfterViewInit');
  }
  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked');
  }

  ngDoCheck(): void{
    console.log('ngDoCheck');
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
      console.log('załadowałem grupy');
      this.yearForm.controls.year.valueChanges.subscribe( val => {
        this.readyToView = false;
        console.log('była zmiana1');
        console.log(this.selectedValue);
        setTimeout(() => {
          this.refresh();
        }, 1000);
        // this.refresh();
      });
      this.year.setValue(this.selectedValue);
      console.log(this.selectedValue);
    });

  }
  buttClick(){
    // this.year.setValue(new Date('2021-01-01'));
    // this.readyToView = !this.readyToView;
    this.readyToView = false;
    this.refresh();
  }

  public refresh(){
    // console.log('refresh:');
    console.log(this.selectedValue);
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
            let insp = new Inspection();
            let d = new Date(certElement.dataSprawdzenia);
            switch (d.getMonth()){
              case 0: {
                        insp.dataPlanowa0 = d;
                        break;
                      }
              case 1: {
                        insp.dataPlanowa1 = d;
                        break;
                      }
              case 2: {
                        insp.dataPlanowa2 = d;
                        break;
                      }
              case 3: {
                        insp.dataPlanowa3 = d;
                        break;
                      }
              case 4: {
                        insp.dataPlanowa4 = d;
                        break;
                      }
              case 5: {
                        insp.dataPlanowa5 = d;
                        break;
                      }
              case 6: {
                        insp.dataPlanowa6 = d;
                        break;
                      }
              case 7: {
                        insp.dataPlanowa7 = d;
                        break;
                      }
              case 8: {
                        insp.dataPlanowa8 = d;
                        break;
                      }
              case 9: {
                        insp.dataPlanowa9 = d;
                        break;
                      }
              case 10: {
                        insp.dataPlanowa10 = d;
                        break;
                      }
              case 11: {
                        insp.dataPlanowa11 = d;
                        break;
                      }
            }
            insp.nrSwiadectwa = certElement.nrSwiadectwa;
            instrElement.sprawdzeniaPlanowe
            .push(insp);
          });

          if (instrElement.dataNastepnejKontroli){
            this.propDate(grupa[0], this.startDate, new Date(instrElement.dataNastepnejKontroli), this.endDate).forEach( el => {
              instrElement.sprawdzeniaPlanowe.push(el);
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
    // this.paginator._intl.itemsPerPageLabel = 'Wyników na stronie:';
    // this.paginator._intl.nextPageLabel = 'Następna strona';
    // this.paginator._intl.previousPageLabel = 'Poprzednia strona';
    // this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    //   if (length === 0 || pageSize === 0) { return `0 z ${length}`; }
    //   length = Math.max(length, 0);
    //   const startIndex = page * pageSize;
    //   const endIndex = startIndex < length ?
    //       Math.min(startIndex + pageSize, length) :
    //       startIndex + pageSize;

    //   return `${startIndex + 1} – ${endIndex} z ${length}`;
    // };

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
