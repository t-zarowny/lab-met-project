import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Observer } from 'rxjs';
import { InstrumentFull } from 'src/app/_models';


@Component({
  templateUrl: './instrument-data-dialog.component.html',
  styleUrls: ['./instrument-data-dialog.component.css']
})
export class InstrumentDataDialogComponent implements OnInit {
  tabs = ['Dane podstawowe', 'Sprawdzenia/Kalibracje', 'Historia'];
  selected = new FormControl(0);

  constructor(public dialogRef: MatDialogRef<InstrumentFull>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
