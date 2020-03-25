import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { DbService} from '../services/db.service';
import {GroupInstrument} from '../interfaces/groupInstrument';

@Component({
  selector: 'app-groupinstruments',
  templateUrl: './groupinstruments.component.html',
  styleUrls: ['./groupinstruments.component.css']
})
export class GroupinstrumentsComponent implements OnInit {
    name: string;
    controlMethod: string;
    loadGroupInstrument: GroupInstrument;

  constructor(public dialog: MatDialog, private db: DbService) { }

  ngOnInit() {

  }
  openDialogAddGroup(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '550px',
      height: '600px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.email = result;
      this.db.groupInstrumentArray.push(result);
      console.log(this.db.groupInstrumentArray);
    });
  }
}