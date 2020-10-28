import { UserService, AreaService } from './../../_services';
import { AlertService } from './../../login/_services/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Area, AreaFull, User } from 'src/app/_models';



@Component({
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.css']
})
export class AddAreaComponent implements OnInit {

  areaForm: FormGroup;
  listUsers: User[];
  selectedUserId = 0;

  constructor(public dialogRef: MatDialogRef<Area>,
              @Inject(MAT_DIALOG_DATA) public data: AreaFull,
              private areaService: AreaService,
              private userService: UserService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit(): void {
    if (this.data.idUser){
      this.selectedUserId = this.data.idUser.id;
      console.log(this.selectedUserId);
    }else{
      console.log(this.selectedUserId);
    }
    this.userService.getAll().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.listUsers = sorted;
      });
    this.areaForm = new FormGroup({
      nazwa: new FormControl(this.data.nazwa, [
        Validators.required,
        Validators.minLength(3)
      ]),
      idUser: new FormControl(this.selectedUserId),
    }, );
    console.log(this.data);
  }
  get nazwa() { return this.areaForm.get('nazwa'); }
  get idUser() { return this.areaForm.get('idUser'); }

  onSubmit(){
    const areaFormData = new FormData();
    areaFormData.append('nazwa', this.areaForm.value.nazwa);
    areaFormData.append('idUser', this.areaForm.value.idUser);

    if (this.data && this.data.id) {
      this.areaService.edit(this.data.id, areaFormData).subscribe(
        (res: Area) => {
          console.log(res);
          this.dialogRef.close();
        }
      );
    }
    else {
      this.areaService.add(areaFormData).subscribe(
        (res: Area) => {
          console.log(res);
          this.dialogRef.close();
        }
      );
    }
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
