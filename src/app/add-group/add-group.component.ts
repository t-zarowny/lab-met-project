import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import {GroupInstrument} from '../interfaces/groupInstrument';
import { from } from 'rxjs';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInstrument) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  
  }

}