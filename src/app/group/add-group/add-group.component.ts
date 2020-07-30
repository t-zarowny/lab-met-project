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

  uploadForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInstrument,
    private db: DbService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private formBuilder: FormBuilder, private httpClient: HttpClient) {
      // tslint:disable-next-line: max-line-length
      this.matIconRegistry.addSvgIcon('attach_file', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/attach_file-24px.svg'));
    }

  get nazwa() { return this.addgroupform.get('nazwa'); }
  get metodaKontroli() { return this.addgroupform.get('metodaKontroli'); }


  addgroupform: FormGroup;

  g: GroupInstrument;

  // matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.addgroupform = new FormGroup({

      nazwa: new FormControl(this.data.nazwa, [
        Validators.required,
        Validators.minLength(3)
      ]),
      metodaKontroli: new FormControl(this.data.metodaKontroli, [
        Validators.required,
        Validators.minLength(3)
      ]),
      kartaPomiarowNazwa: new FormControl(this.data.kartaPomiarowNazwa),
      kartaPomiarowPlik: new FormControl(this.data.kartaPomiarowPlik),

    });


    this.uploadForm = this.formBuilder.group({
      kartaPomiarowPlik: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.g = {  id: this.data.id,
                nazwa: this.addgroupform.value.nazwa,
                metodaKontroli: this.addgroupform.value.metodaKontroli,
                kartaPomiarowNazwa: this.data.kartaPomiarowNazwa,
                kartaPomiarowPlik: this.data.kartaPomiarowPlik
              };

    console.log('Wysłanie:');
    console.log(this.g);

    const formData = new FormData();
    formData.append('nazwa', this.addgroupform.value.nazwa);
    formData.append('metodaKontroli', this.addgroupform.value.metodaKontroli);
    formData.append('kartaPomiarowNazwa', this.addgroupform.value.kartaPomiarowNazwa);
    formData.append('kartaPomiarowPlik', this.uploadForm.get('kartaPomiarowPlik').value);

    if (this.g.id){
      this.db.updateGroup(this.g.id, formData).subscribe();
    }
    else
    {
      this.db.addNewGroup(formData).subscribe();
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
      this.uploadForm.get('kartaPomiarowPlik').setValue(file);
      this.addgroupform.patchValue({kartaPomiarowNazwa: event.target.files[0].name});
      // console.log(event.target.files[0].name);
    }
  }
}
