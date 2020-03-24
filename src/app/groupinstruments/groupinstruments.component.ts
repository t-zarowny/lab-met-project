import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-groupinstruments',
  templateUrl: './groupinstruments.component.html',
  styleUrls: ['./groupinstruments.component.css']
})
export class GroupinstrumentsComponent implements OnInit {
    email: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialogAddGroup(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '800px',
      height: '800px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }
}