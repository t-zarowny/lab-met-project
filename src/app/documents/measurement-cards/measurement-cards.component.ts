import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupInstrument, MeasurementCardTemplate } from 'src/app/assistant/interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { AddGroupComponent } from 'src/app/group/add-group/add-group.component';
import { MeasurementCardsDialogComponent } from '../measurement-cards-dialog/measurement-cards-dialog.component';

@Component({
  selector: 'app-measurement-cards',
  templateUrl: './measurement-cards.component.html',
  styleUrls: ['./measurement-cards.component.css']
})
export class MeasurementCardsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'documentNo', 'title',  'template'];
  dataSource: MatTableDataSource<MeasurementCardTemplate>;
  selection = new SelectionModel<MeasurementCardTemplate>();
  selectedRowIndex = -1;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private db: DbService) {
    this.dataSource = new MatTableDataSource(db.measurementCardArray);
  }

  ngOnInit(): void {
    this.db.getListMeasurementCard().subscribe(cards => {
      this.dataSource.data = cards;
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
    checkboxLabel(row?: MeasurementCardTemplate): string {
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

  openDialogAddGroup(c?: MeasurementCardTemplate): void {

    const dialogRef = this.dialog.open(MeasurementCardsDialogComponent, {
      width: '800px',
      height: '800px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '10px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: { id: c?.id,
              documentNo: c?.documentNo,
              title: c?.title,
              template: c?.template
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.highlight(-1);
      // this.email1 = result;
      // console.log(result);
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
