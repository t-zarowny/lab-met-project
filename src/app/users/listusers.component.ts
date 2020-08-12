import { first } from 'rxjs/operators';
import { FormUserComponent } from './form-user/form-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../_services';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>();
  selectedRowIndex = -1;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
              private userService: UserService) {
    this.dataSource = new MatTableDataSource(Array<User>());
               }

  ngOnInit() {
    this.refresh();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    this.userService.getAll().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.dataSource.data = sorted;
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

  checkboxLabel(row?: User): string {
    if (!row) {

    }
    return null;
  }
  highlight(row: any) {
    this.selectedRowIndex = row.id;
    // console.log(this.selection.selected);
  }
  openDialogAddGroup(u?: User): void {
    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '550px',
      height: '630px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {
        id: u?.id || 0,
        username: u?.username || null,
        email: u?.email || null,
        first_name: u?.first_name || null,
        last_name: u?.last_name || null,
        is_staff: u?.is_staff || false,
        is_active: u?.is_active || false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.highlight(-1);
      this.refresh();
      // this.email1 = result;
      // console.log(result);
      // this.db.groupInstrumentArray.push(result);
      // console.log(this.db.groupInstrumentArray);
    });
  }
}
