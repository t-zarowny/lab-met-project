import { Area } from './../../_models/area';
import { GroupInstrument } from './../../_models/group';
import { InstrumentService } from './../../_services/instrument.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Observer } from 'rxjs';
import { InstrumentFull, User } from 'src/app/_models';
import { ListInstrumentComponent } from '../list-instrument.component';


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
              @Inject(MAT_DIALOG_DATA) public data: number,
              private instrumentService: InstrumentService) {
  }

  ngOnInit(): void {
    this.instrumentService.get(this.data).subscribe( data => {
      this.instrument = data;
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }

  editInstrumentData(){
    // listInstrument: ListInstrumentComponent;
    // ListInstrumentComponent.openDialogAdd(this.instrument);
  }
}
