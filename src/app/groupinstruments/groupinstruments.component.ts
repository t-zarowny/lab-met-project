import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { DbService} from '../services/db.service';
import {GroupInstrument} from '../interfaces/groupInstrument';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


@Component({
  selector: 'app-groupinstruments',
  templateUrl: './groupinstruments.component.html',
  styleUrls: ['./groupinstruments.component.css']
})
export class GroupinstrumentsComponent implements OnInit {

    name: string;
    controlMethod: string;
    loadGroupInstrument: GroupInstrument;
    // public Editor = ClassicEditor;
    public Editor = DecoupledEditor;
    public model = {
      editorData: '<p>Hello, world!</p>'
  };

  constructor(public dialog: MatDialog, private db: DbService) { }

  ngOnInit() {

  }
  openDialogAddGroup(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '550px',
      height: '400px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.email1 = result;
      console.log(result);
      // this.db.groupInstrumentArray.push(result);
      // console.log(this.db.groupInstrumentArray);
    });
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
}
