import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {GroupInstrument} from '../../assistant/interfaces';
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
  kartaPomiarowNazwa: string = null;
  kartaPomiarowLink: string = null;
  g: GroupInstrument;

  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInstrument,
    private db: DbService,
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




  // matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.groupForm = new FormGroup({

      nazwa: new FormControl(this.data.nazwa, [
        Validators.required,
        Validators.minLength(3)
      ]),
      metodaKontroli: new FormControl(this.data.metodaKontroli, [
        Validators.required,
        Validators.minLength(3)
      ]),
      // kartaPomiarowNazwa: new FormControl(this.data.karta ? this.data.karta[0].nazwa : ''),
      // kartaPomiarowPlik: new FormControl(this.data.karta ? this.data.karta[0].link : ''),

    });


    this.fileGroupForm = this.formBuilder.group({
      kartaPomiarowNazwa: [null],
      kartaPomiarowLink: [null],
      idGrupa: [null]
    });
    if (this.data.karta && this.data.karta.length){
      this.kartaPomiarowNazwa = this.data.karta[0].nazwa;
      this.kartaPomiarowLink = this.data.karta[0].link;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    const groupFormData = new FormData();
    groupFormData.append('nazwa', this.groupForm.value.nazwa);
    groupFormData.append('metodaKontroli', this.groupForm.value.metodaKontroli);
    // = {  id: this.data.id,
    //             nazwa: this.groupForm.value.nazwa,
    //             metodaKontroli: this.addgroupform.value.metodaKontroli
    //           };

    console.log('Wysłanie:');
    console.log(groupFormData);

    // const formData = new FormData();
    // formData.append('nazwa', this.addgroupform.value.nazwa);
    // formData.append('metodaKontroli', this.addgroupform.value.metodaKontroli);


    if (this.data && this.data.id){
      this.db.updateGroup(this.data.id, groupFormData).subscribe();
      if (this.data.karta.length === 0 && this.kartaPomiarowNazwa){
        const groupFormFile = new FormData();
        groupFormFile.append('nazwa', this.fileGroupForm.get('kartaPomiarowNazwa').value);
        groupFormFile.append('link', this.fileGroupForm.get('kartaPomiarowLink').value);
        groupFormFile.append('idGrupa', this.data.id.toString());
        this.groupService.addNewFile(groupFormFile).subscribe();
        console.log(`groupFormFile:`);
        console.log(groupFormFile.forEach);
      }
    }
    else
    {
      this.db.addNewGroup(groupFormData).subscribe();
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
  handleFileInput(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileGroupForm.get('kartaPomiarowLink').setValue(file);
      this.fileGroupForm.patchValue({kartaPomiarowNazwa: event.target.files[0].name});
      this.kartaPomiarowNazwa = event.target.files[0].name;
      this.kartaPomiarowLink = null;
      console.log(this.fileGroupForm);
    }
  }

  deleteFile(){
    if (this.data.karta.length){
      this.groupService.deleteFile(this.data.karta[0].id).subscribe(() => {
        this.kartaPomiarowNazwa = null;
        this.kartaPomiarowLink = null;
      });
    }else{
      this.fileGroupForm.reset();
      this.kartaPomiarowNazwa = null;
      console.log(this.fileGroupForm);
    }
  }
}
