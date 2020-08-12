import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../_services';
import { User } from '../../_models';
import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<User>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({

      username: new FormControl(this.data.username, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]),
      first_name: new FormControl(this.data.first_name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(this.data.last_name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      is_staff: new FormControl(!!this.data.is_staff),
      is_active: new FormControl(this.data.is_active),
    });
    console.log(this.data);
  }
  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get first_name() { return this.userForm.get('first_name'); }
  get last_name() { return this.userForm.get('last_name'); }
  get is_staff(): boolean { return !!this.userForm.get('is_staff'); }
  get is_active() { return this.userForm.get('is_active'); }

  onSubmit(){

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
