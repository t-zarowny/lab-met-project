import { InstrumentFull, User } from './../_models';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/login/_services';
import { InstrumentService } from 'src/app/_services';
import { AddinstrumentComponent } from './add-instrument/add-instrument.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listinstrument',
  templateUrl: './list-instrument.component.html',
  styleUrls: ['./list-instrument.component.css']
})
export class ListInstrumentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'nazwa', 'typ', 'grupa', 'miejsce', 'status'];
  dataSource: MatTableDataSource<InstrumentFull>;
  selection = new SelectionModel<InstrumentFull>();
  selectedRowIndex = -1;
  user: User;
  isAuthenticated = false;
  isPossibleAdd = false;
  isPossibleEdit = false;
  isPossibleDelete = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
              private instrumentService: InstrumentService,
              private auth: AuthenticationService) {
    this.dataSource = new MatTableDataSource(Array<InstrumentFull>());
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
      console.log(user);
      if (this.user && this.user.is_staff){
      this.isPossibleAdd = true;
      }
    });
    this.refresh();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.instrumentService.getAll().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.dataSource.data = sorted;
      console.log(data);
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
  checkboxLabel(row?: InstrumentFull): string {
    if (!row) {

    }
    return null;
  }
  highlight(row: any) {
    this.selectedRowIndex = row.id;
    // tslint:disable-next-line: triple-equals
    // console.log('Selection:');
    // console.log(this.selection.selected[0].lokalizacja.length);
    if (this.selection.selected.length === 1 && this.user.is_staff){
      this.isPossibleEdit = true;
      this.isPossibleDelete = true;
    }else{
      this.isPossibleEdit = false;
      this.isPossibleDelete = false;
    }
  }
  openDialogAdd(i?: InstrumentFull): void{
    if (!i){
      i = new InstrumentFull();
    }
    const dialogRef = this.dialog.open(AddinstrumentComponent, {
      width: '550px',
      height: '630px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: i
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.highlight(-1);
      this.refresh();
    });
  }
  deleteSelected(i?: InstrumentFull): void{
    // this.db.deleteGroup(g.id);
    const message = `Czy napewno chcesz usunąć przyrząd:<br/><b> ${i.nazwa}? </b><br/>Zostanie on trwale usunięty.`;
    // const message = 'Czy napewno chcesz usunąć stanowisko' + '<br>' + p.nazwa + '? Stanowisko zostanie trwale usunięte.';

    const dialogData = new ConfirmDialogModel('Potwierdź usunięcie', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.instrumentService.delete(i.id).subscribe(() => {
          this.refresh();
        });
      }
    });
  }
}
