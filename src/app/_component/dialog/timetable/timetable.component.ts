import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add, subtract } from 'add-subtract-date';

@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
  selectedValue: Date;
  yearsList: Array<Date> = [];

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('1000px', '800px');
    this.dialogRef.updatePosition({top: '30px'});
    const dateStart = new Date('2020-01-01');
    const dateCurr = new Date();
    this.selectedValue = dateCurr;
    const years = Math.floor((dateCurr.getTime() - dateStart.getTime()) / 1000 / 60 / 60 / 24 / 365);
    let d = new Date(dateStart.getTime());
    for (let i = 0; i < 11 + years; i++){
      this.yearsList.push(d);
      d = new Date(d.getTime());
      add(d, 1, 'year');
    }
    // console.log(this.yearsList);
  }
  onNoClick(){
    this.dialogRef.close();
  }
  yearSelected(eventData: any, picker?: any) {
    picker.close();
  }

}
