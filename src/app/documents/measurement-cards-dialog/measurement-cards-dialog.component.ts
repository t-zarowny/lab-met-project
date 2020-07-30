import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeasurementCardTemplate } from 'src/app/assistant/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from 'src/app/_services/db.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-measurement-cards-dialog',
  templateUrl: './measurement-cards-dialog.component.html',
  styleUrls: ['./measurement-cards-dialog.component.css']
})
export class MeasurementCardsDialogComponent implements OnInit {

  addcardform: FormGroup;
  c: MeasurementCardTemplate;
  public Editor = DecoupledEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
};

  constructor(public dialogRef: MatDialogRef<MeasurementCardsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MeasurementCardTemplate,
              private db: DbService) { }

  ngOnInit(): void {
    this.addcardform = new FormGroup({

      documentNo: new FormControl(this.data.documentNo, [
        Validators.required,
        Validators.minLength(3)
      ]),
      title: new FormControl(this.data.title, [
        Validators.required,
        Validators.minLength(3)
      ]),
      template: new FormControl(this.data.template),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.c = {  id: this.data.id,
                documentNo: this.addcardform.value.documentNo,
                title: this.addcardform.value.title,
                template: this.addcardform.value.template
              };
    this.db.addNewMeasurementCard(this.c);
    // console.log('Wysłanie:');
    // console.log(this.g);
    // console.log('Odczyt db:');
    // console.log(this.db.groupInstrumentArray);
    this.dialogRef.close();
  }

  get documentNo() { return this.addcardform.get('documentNo'); }
  get title() { return this.addcardform.get('title'); }
  get template() { return this.addcardform.get('template'); }

  public onReady( editor: { ui: { getEditableElement: () => {
                (): any; new(): any; parentElement: {
                  (): any; new(): any; insertBefore: {
                    (arg0: any, arg1: any): void; new(): any; }; }; }; view: { toolbar: { element: any; }; }; }; } ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }
}
