import { AlertService } from './../../login/_services/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Place } from 'src/app/_models';
import { PlaceService } from 'src/app/_services';

@Component({
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  placeForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<Place>,
              @Inject(MAT_DIALOG_DATA) public data: Place,
              private placeService: PlaceService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }


  ngOnInit(): void {
    this.placeForm = new FormGroup({
      nazwa: new FormControl(this.data.nazwa, [
        Validators.required,
        Validators.minLength(3)
      ]),
      idObszar: new FormControl(this.data.idObszar),
    }, );
    console.log(this.data);
  }
  get nazwa() { return this.placeForm.get('nazwa'); }

  onSubmit(){
    const placeFormData = new FormData();
    placeFormData.append('nazwa', this.placeForm.value.nazwa);
    placeFormData.append('idObszar', this.placeForm.value.idObszar);

    if (this.data && this.data.id) {
      this.placeService.edit(this.data.id, placeFormData).subscribe(
        (res: Place) => {
          console.log(res);
          this.dialogRef.close();
        }
      );
    }
    else {
      this.placeService.add(placeFormData).subscribe(
        (res: Place) => {
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
