import { Area } from './../../_models/area';
import { GroupInstrument } from './../../_models/group';
import { InstrumentService } from './../../_services/instrument.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Observer } from 'rxjs';
import { InstrumentFull, User } from 'src/app/_models';
import { ListInstrumentComponent } from '../list-instrument.component';
import { AddinstrumentComponent } from '../add-instrument/add-instrument.component';


@Component({
  templateUrl: './instrument-data-dialog.component.html',
  styleUrls: ['./instrument-data-dialog.component.css']
})
export class InstrumentDataDialogComponent implements OnInit {
  tabs = ['Dane podstawowe', 'Sprawdzenia/Kalibracje', 'Historia'];
  selected = new FormControl(0);
  instrument: InstrumentFull;
  group: GroupInstrument;
  area: Area;
  userArea: User;

  constructor(public dialogRef: MatDialogRef<InstrumentFull>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private instrumentService: InstrumentService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  refresh(){
    this.instrumentService.get(this.data).subscribe( data => {
      this.instrument = data;
    });
  }

  editInstrumentData(){
    // listInstrument: ListInstrumentComponent;
    // ListInstrumentComponent.openDialogAdd(this.instrument);
    const dialogRef = this.dialog.open(AddinstrumentComponent, {
      width: '550px',
      height: '630px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: this.instrument
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selection.clear();
      // this.highlight(-1);
      this.refresh();
    });
  }
}
