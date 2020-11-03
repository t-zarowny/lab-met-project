import { AuditUnitService } from './../../_services/audit-unit.service';
import { IntervalUnitService } from './../../_services/interval-unit.service';
import { IntervalUnit } from './../../_models/intervalUnit';
import { AuditUnit } from './../../_models/auditUnit';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {GroupInstrument} from '../../_models';
import {ErrorStateMatcher} from '@angular/material/core';
import { DbService } from '../../_services/db.service';
import { GroupinstrumentsComponent } from '../group.component';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from 'src/app/_services';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent  implements OnInit {

  fileGroupForm: FormGroup;
  groupForm: FormGroup;
  isDeleteFile = false;
  isNewFile = false;
  auditUnitList: AuditUnit[];
  auditUnitSelectedId = 0;
  intervalUnitList: IntervalUnit[];
  intervalUnitSelectedId = 0;


  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInstrument,
    private intervalUnitService: IntervalUnitService,
    private auditUnitService: AuditUnitService,
    private groupService: GroupService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private formBuilder: FormBuilder)
    {
      this.matIconRegistry.addSvgIcon('attach_file',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/attach_file-24px.svg'));
      console.log(this.data);
    }

  get nazwa() { return this.groupForm.get('nazwa'); }
  get metodaKontroli() { return this.groupForm.get('metodaKontroli'); }
  get kartaPomiarowId() { return this.fileGroupForm.get('kartaPomiarowId').value; }
  get kartaPomiarowNazwa() { return this.fileGroupForm.get('kartaPomiarowNazwa').value; }
  get kartaPomiarowLink() { return this.fileGroupForm.get('kartaPomiarowLink').value; }
  get kartaPomiarowIdGrupa() { return this.fileGroupForm.get('idGrupa').value; }
  get intervalValue() { return this.fileGroupForm.get('intervalValue').value; }
  get nrGrupy() { return this.fileGroupForm.get('nrGrupy').value; }
  get intervalUnit() { return this.fileGroupForm.get('intervalUnit').value; }
  get auditUnit() { return this.fileGroupForm.get('auditUnit').value; }


  ngOnInit() {
    // if (this.data.id !== 0){
    //   if (this.data.wielkoscBadana){
    //     this.auditUnitSelectedId = this.data.wielkoscBadana.id;
    //   }
    //   if (this.data.interwalJednostka){
    //     this.intervalUnitSelectedId = this.data.interwalJednostka.id;
    //   }
    // }
    this.intervalUnitService.getAll().subscribe( data => {
      // const sorted = data.sort((a, b) => a.id - b.id);
      this.intervalUnitList = data;
    });
    this.auditUnitService.getAll().subscribe( data => {
      // const sorted = data.sort((a, b) => a.id - b.id);
      this.auditUnitList = data;
    });
    this.groupForm = new FormGroup({

      nazwa: new FormControl(this.data.nazwa, [
        Validators.required,
        Validators.minLength(3)
      ]),
      metodaKontroli: new FormControl(this.data.metodaKontroli, [
        Validators.required,
        Validators.minLength(3)
      ]),
      nrGrupy: new FormControl(this.data.id ? this.data.nrGrupy : null, [
        Validators.min(1),
        Validators.required
      ]),
      intervalValue: new FormControl(this.data.id ? this.data.interwalWartosc : '', [
        Validators.min(1),
        Validators.required
      ]),
      intervalUnit: new FormControl(this.data.interwalJednostka ? this.data.interwalJednostka.id : '', [
        Validators.required
      ]),
      auditUnit: new FormControl(this.data.wielkoscBadana ? this.data.wielkoscBadana.id : '')
      // kartaPomiarowNazwa: new FormControl(this.data.karta ? this.data.karta[0].nazwa : ''),
      // kartaPomiarowPlik: new FormControl(this.data.karta ? this.data.karta[0].link : ''),
    });


    this.fileGroupForm = this.formBuilder.group({
      kartaPomiarowId: [this.data.karta ? this.data.karta[0]?.id : null],
      kartaPomiarowNazwa: [this.data.karta ? this.data.karta[0]?.nazwa : null],
      kartaPomiarowLink: [this.data.karta ? this.data.karta[0]?.link : null],
      idGrupa: [this.data.karta ? this.data?.id.toString() : null]
    });

    // if (this.data.karta && this.data.karta.length){
    //   this.kartaPomiarowNazwa = this.data.karta[0].nazwa;
    //   this.kartaPomiarowLink = this.data.karta[0].link;
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    const groupFormData = new FormData();
    groupFormData.append('nazwa', this.groupForm.value.nazwa);
    groupFormData.append('metodaKontroli', this.groupForm.value.metodaKontroli);
    groupFormData.append('nrGrupy', this.groupForm.value.nrGrupy);
    groupFormData.append('interwalWartosc', this.groupForm.value.intervalValue);
    groupFormData.append('interwalJednostka', this.groupForm.value.intervalUnit);
    groupFormData.append('wielkoscBadana', this.groupForm.value.auditUnit);

    groupFormData.forEach((value, key) => {
      console.log(key + ': ' + value);
       });
    // = {  id: this.data.id,
    //             nazwa: this.groupForm.value.nazwa,
    //             metodaKontroli: this.addgroupform.value.metodaKontroli
    //           };

    // console.log('Wysłanie:');
    // console.log(groupFormData);

    // const formData = new FormData();
    // formData.append('nazwa', this.addgroupform.value.nazwa);
    // formData.append('metodaKontroli', this.addgroupform.value.metodaKontroli);


    if (this.data && this.data.id){
      this.groupService.update(this.data.id, groupFormData).subscribe();
      if (this.isDeleteFile){
        this.groupService.deleteFile(this.kartaPomiarowId).subscribe();
      }
      this.saveNewFile();
    }
    else
    {
      this.groupService.addNew(groupFormData).subscribe(
        (res: GroupInstrument) => {
                  this.fileGroupForm.get('idGrupa').setValue(res.id);
                  this.saveNewFile();
                }
      );
    }




/*
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
*/
    // console.log('Odczyt db:');
    // console.log(this.db.groupInstrumentArray);

    this.dialogRef.close();
  }

  saveNewFile(){
    if (this.isNewFile){
      const groupFormFile = new FormData();
      groupFormFile.append('nazwa', this.kartaPomiarowNazwa);
      groupFormFile.append('link', this.kartaPomiarowLink);
      groupFormFile.append('idGrupa', this.kartaPomiarowIdGrupa);
      this.groupService.addNewFile(groupFormFile).subscribe();
      // console.log(`groupFormFile:`);
      // console.log(groupFormFile.forEach);
    }
  }
  handleFileInput(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileGroupForm.get('kartaPomiarowLink').setValue(file);
      this.fileGroupForm.patchValue({kartaPomiarowNazwa: event.target.files[0].name});
      this.isNewFile = true;
      // this.kartaPomiarowNazwa = event.target.files[0].name;
      // this.kartaPomiarowLink = null;
      // console.log(this.fileGroupForm);
    }
  }

  deleteFile(){
    if (this.kartaPomiarowId){
      this.isDeleteFile = true;
    }
    this.fileGroupForm.get('kartaPomiarowNazwa').setValue(null);
    this.fileGroupForm.get('kartaPomiarowLink').setValue(null);
  }
}
