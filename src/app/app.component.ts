import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddGroupComponent} from './add-group/add-group.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lab-app';

  constructor(private dialog: MatDialog){

  }

  ngOnInit(){

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddGroupComponent, dialogConfig);
}
}
