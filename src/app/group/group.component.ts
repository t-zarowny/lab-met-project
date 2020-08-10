import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupComponent } from './add-group/add-group.component';
import { DbService, GroupService } from '../_services';
import { GroupInstrument, KartaPomiarow } from '../assistant/interfaces';
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

  displayedColumns: string[] = ['select', 'id', 'nazwa', 'metodaKontroli', 'kartaPomiarowNazwa'];
  dataSource: MatTableDataSource<GroupInstrument>;
  selection = new SelectionModel<GroupInstrument>();
  selectedRowIndex = -1;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(public dialog: MatDialog,
              private db: DbService,
              private groupService: GroupService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry
              ) {
    this.dataSource = new MatTableDataSource(Array<GroupInstrument>());
    this.matIconRegistry.addSvgIcon('attach_file', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/attach_file-24px.svg'));
  }

  ngOnInit() {
    this.refreshGroup();
  }

  refreshGroup() {
    this.groupService.getList().subscribe(data => {
      this.dataSource.data = data;
      // console.log(data);
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
        id: g?.id || 0,
        nazwa: g?.nazwa,
        metodaKontroli: g?.metodaKontroli,
        karta: g?.karta || []
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

}
