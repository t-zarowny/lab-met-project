import { Area, AreaFull } from './../_models/area';
import { Place, User } from 'src/app/_models';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from '../login/_services';
import { AreaService, PlaceService } from '../_services';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel, DataSource} from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AddPlaceComponent } from './add-place/add-place.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { AddAreaComponent } from './add-area/add-area.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AreaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'id', 'nazwa', 'user'];
  dataSource: MatTableDataSource<AreaFull>;
  selection = new SelectionModel<AreaFull>();
  selectedRowIndex = -1;
  user: User;
  isAuthenticated = false;
  expandedElement: any;
  displayedColumnsPlace: string[] = ['nazwa', 'action'];
  selectionPlace = new SelectionModel<Place>();
  selectedRowIndexPlace = -1;
  isPossibleAdd = false;
  isPossibleEdit = false;
  isPossibleDelete = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
              private areaService: AreaService,
              private placeService: PlaceService,
              private auth: AuthenticationService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
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
    this.areaService.getAll().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.dataSource.data = sorted;
      if (this.selectedRowIndex > 0){
        let p: Place;
        p = this.dataSource.data.filter(x => x.id === this.selectedRowIndex)[0];
        this.selection.select(p);
        console.log(this.selection.selected);
        console.log(this.selection.isSelected(p));
      }
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
  checkboxLabel(row?: AreaFull): string {
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
      if (this.selection.selected[0].lokalizacja.length){
        this.isPossibleDelete = false;
      }
    }else{
      this.isPossibleEdit = false;
      this.isPossibleDelete = false;
    }
  }
  highlightPlace(row: any) {
    this.selectedRowIndexPlace = row.id;
    // tslint:disable-next-line: triple-equals
  }
  openDialogAddPlace(p?: Place): void {
    const dialogRef = this.dialog.open(AddPlaceComponent, {
      width: '550px',
      height: '430px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {
        id: p?.id || 0,
        nazwa: p?.nazwa || '',
        idObszar: p?.idObszar || this.selectedRowIndex
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  openDialogAddArea(a?: AreaFull): void {
    const dialogRef = this.dialog.open(AddAreaComponent, {
      width: '550px',
      height: '430px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: {
        id: a?.id || 0,
        nazwa: a?.nazwa || '',
        idUser: a?.idUser || 0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  deleteSelectedPlace(p?: Place): void {
    // this.db.deleteGroup(g.id);
    const message = `Czy napewno chcesz usunąć stanowisko:<br/><b> ${p.nazwa}? </b><br/>Stanowisko zostanie trwale usunięte.`;
    // const message = 'Czy napewno chcesz usunąć stanowisko' + '<br>' + p.nazwa + '? Stanowisko zostanie trwale usunięte.';

    const dialogData = new ConfirmDialogModel('Potwierdź usunięcie', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.placeService.delete(p.id).subscribe(() => {
          this.refresh();
        });
      }
    });

  }
  deleteSelectedArea(a?: AreaFull): void {
    // this.db.deleteGroup(g.id);
    const message = `Czy napewno chcesz usunąć obszar:<br/><b> ${a.nazwa}? </b><br/>Obszar zostanie trwale usunięte.`;
    // const message = 'Czy napewno chcesz usunąć stanowisko' + '<br>' + p.nazwa + '? Stanowisko zostanie trwale usunięte.';

    const dialogData = new ConfirmDialogModel('Potwierdź usunięcie', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.areaService.delete(a.id).subscribe(() => {
          this.refresh();
        });
      }
    });

  }

}

