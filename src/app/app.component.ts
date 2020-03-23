import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddGroupComponent } from './add-group/add-group.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lab-app';
  email: string;

  constructor(public dialog: MatDialog){}

  ngOnInit(){

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '500px',
      position: {
        top: '100px',
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
