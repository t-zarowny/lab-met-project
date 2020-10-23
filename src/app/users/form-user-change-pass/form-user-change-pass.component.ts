import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../_services';
import { AlertService } from './../../login/_services';
import { FormControl, AbstractControl, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './form-user-change-pass.component.html',
  styleUrls: ['./form-user-change-pass.component.css']
})
export class FormUserChangePassComponent implements OnInit {

  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<User>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  get editPassword() { return this.userForm.get('editPassword') || null; }
  get rePassword() { return this.userForm.get('rePassword') || null; }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      editPassword: new FormControl(null, [
        Validators.minLength(8)
      ]),
      rePassword: new FormControl(null, [])
    }, this.passwordConfirming);
    console.log(this.data);
  }

  onSubmit() {
    const userFormData = new FormData();
    userFormData.append('username', this.userForm.value.editUsername);
    userFormData.append('password', this.userForm.value.editPassword);
    userFormData.append('email', this.userForm.value.email);
    userFormData.append('first_name', this.userForm.value.first_name);
    userFormData.append('last_name', this.userForm.value.last_name);
    userFormData.append('is_staff', this.userForm.value.is_staff);
    userFormData.append('is_active', this.userForm.value.is_active);

    if (this.data && this.data.id) {
      this.userService.passUser(this.data.id, userFormData).subscribe(
        (res: User) => {
          console.log(res);
          this.dialogRef.close();
        }
      );
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('editPassword').value !== c.get('rePassword').value) {
        c.get('rePassword').setErrors({notUnique: true});
        return {invalid: true};
    }
  }

}
