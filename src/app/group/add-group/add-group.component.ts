import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {GroupInstrument} from '../../assistant/interfaces';
import {ErrorStateMatcher} from '@angular/material/core';
import { DbService } from '../../services/db.service';
import { GroupinstrumentsComponent } from '../group.component';



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


  addgroupform: FormGroup;

  g: GroupInstrument;

  // matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.addgroupform = new FormGroup({

      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      controlMethod: new FormControl(this.data.controlMethod, [
        Validators.required,
        Validators.minLength(3)
      ]),

    });
  }
  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInstrument,
    private db: DbService) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.g = {  id: this.data.id,
                name: this.addgroupform.value.name,
                controlMethod: this.addgroupform.value.controlMethod,
                measurementCardTemplateId: this.data.measurementCardTemplateId};
    this.db.addNewGroup(this.g);
    // console.log('Wysłanie:');
    // console.log(this.g);
    // console.log('Odczyt db:');
    // console.log(this.db.groupInstrumentArray);
    this.dialogRef.close();
  }

  get name() { return this.addgroupform.get('name'); }
  get controlMethod() { return this.addgroupform.get('controlMethod'); }
}
