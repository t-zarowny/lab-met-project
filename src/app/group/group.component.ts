import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddGroupComponent } from './add-group/add-group.component';
import { DbService } from '../_services/db.service';
import { GroupInstrument } from '../assistant/interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-groupinstruments',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupinstrumentsComponent implements OnInit {

  nazwa: string;
  metodaKontroli: string;
  loadGroupInstrument = new Array<GroupInstrument>();
  // public Editor = ClassicEditor;
  public Editor = DecoupledEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  displayedColumns: string[] = ['select', 'id', 'nazwa', 'metodaKontroli', 'kartaPomiarowNazwa'];
  dataSource: MatTableDataSource<GroupInstrument>;
  selection = new SelectionModel<GroupInstrument>();
  selectedRowIndex = -1;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(public dialog: MatDialog,
              private db: DbService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(this.loadGroupInstrument);
    this.matIconRegistry.addSvgIcon('attach_file', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/attach_file-24px.svg'));
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    // this.dataSource = new MatTableDataSource(db.groupInstrumentArray);
    // this.dataSource = new MatTableDataSource(this.dataGroup);

  }

  ngOnInit() {
    this.refreshGroup();
  }

  refreshGroup() {
    this.db.getListGroup().subscribe(groups => {
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

  highlight(row: any) {
    this.selectedRowIndex = row.id;
    // console.log(this.selection.selected);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogAddGroup(g?: GroupInstrument): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '550px',
      height: '430px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {
        id: g?.id,
        nazwa: g?.nazwa,
        metodaKontroli: g?.metodaKontroli,
        kartaPomiarowNazwa: g?.kartaPomiarowNazwa
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.highlight(-1);
      this.refreshGroup();
      // this.email1 = result;
      // console.log(result);
      // this.db.groupInstrumentArray.push(result);
      // console.log(this.db.groupInstrumentArray);
    });
  }

  deleteSelectedGroup(g?: GroupInstrument): void {
    // this.db.deleteGroup(g.id);
    const message = `Czy napewno chcesz usunąć grupę ${g.nazwa}? Grupa ta zostanie trwale usunięta.`;

    const dialogData = new ConfirmDialogModel('Potwierdź usunięcie', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.selection.clear();
        this.highlight(-1);
        this.db.deleteGroup(g.id).subscribe(() => {
          this.refreshGroup();
        });
      }
      else {
        this.selection.clear();
        this.highlight(-1);
      }
    });

  }

  // tslint:disable-next-line: max-line-length
  public onReady(editor: { ui: { getEditableElement: () => { (): any; new(): any; parentElement: { (): any; new(): any; insertBefore: { (arg0: any, arg1: any): void; new(): any; }; }; }; view: { toolbar: { element: any; }; }; }; }) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

}
