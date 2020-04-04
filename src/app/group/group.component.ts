import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddGroupComponent } from './add-group/add-group.component';
import { DbService} from '../services/db.service';
import {GroupInstrument} from '../assistant/interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-groupinstruments',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
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

  displayedColumns: string[] = ['select', 'id', 'name', 'controlMethod',  'measurementCardTemplateId'];
  dataSource: MatTableDataSource<GroupInstrument>;
  selection = new SelectionModel<GroupInstrument>();
  selectedRowIndex = -1;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialog: MatDialog, private db: DbService) {
        // Create 100 users
        // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
        this.dataSource = new MatTableDataSource(db.groupInstrumentArray);
        // Assign the data to the data source for the table to render
        // this.dataSource = new MatTableDataSource(users);
        // this.dataSource = new MatTableDataSource(db.groupInstrumentArray);
        // this.dataSource = new MatTableDataSource(this.dataGroup);

   }

  ngOnInit() {
    this.db.getListGroup().subscribe(groups =>{
      this.dataSource.data = groups;
    });
    this.paginator._intl.itemsPerPageLabel = 'Wyników na stronie:';
    this.paginator._intl.nextPageLabel = 'Następna strona';
    this.paginator._intl.previousPageLabel = 'Poprzednia strona';

    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) { return `0 z ${length}`; }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;

      return `${startIndex + 1} – ${endIndex} z ${length}`;
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: GroupInstrument): string {
      if (!row) {

      }
      return null;
    }


    highlight(row: any){
      this.selectedRowIndex = row.id;
      // console.log(this.selection.selected.length);
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  // tslint:disable-next-line: max-line-length
  public onReady( editor: { ui: { getEditableElement: () => { (): any; new(): any; parentElement: { (): any; new(): any; insertBefore: { (arg0: any, arg1: any): void; new(): any; }; }; }; view: { toolbar: { element: any; }; }; }; } ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

}
