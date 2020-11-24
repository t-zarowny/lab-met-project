import { CertificateService } from 'src/app/_services';
import { HttpEvent } from '@angular/common/http';
import { Area } from './../../_models/area';
import { GroupInstrument } from './../../_models/group';
import { InstrumentService } from './../../_services/instrument.service';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from, Observable, Observer } from 'rxjs';
import { Certificate, InstrumentFull, User } from 'src/app/_models';
import { ListInstrumentComponent } from '../list-instrument.component';
import { AddinstrumentComponent } from '../add-instrument/add-instrument.component';
import { CertificateDialogComponent } from 'src/app/certificate-dialog/certificate-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CertificateToPdf } from 'src/app/_helpers/certificate.to.pdf';



@Component({
  templateUrl: './instrument-data-dialog.component.html',
  styleUrls: ['./instrument-data-dialog.component.css']
})
export class InstrumentDataDialogComponent implements OnInit, AfterViewInit {
  tabs = ['Dane podstawowe', 'Sprawdzenia/Kalibracje', 'Historia'];
  selected = new FormControl(0);
  instrument: InstrumentFull;
  isDataLoaded = false;
  displayedColumns: string[] = ['nrSwiadectwa', 'wynikSprawdzenia', 'dataSprawdzenia', 'dataNastepnejKontroli', 'sprawdzenieZewnetrzne', 'action'];
  dataSource: MatTableDataSource<Certificate>;
  selection = new SelectionModel<Certificate>();
  selectedRowIndex = -1;
  title = 'title';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<InstrumentFull>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private instrumentService: InstrumentService,
              private cetrificateService: CertificateService) {
    this.instrument = new InstrumentFull();
    this.dataSource = new MatTableDataSource(Array<Certificate>());
  }

  ngOnInit(): void {
    const sortState: Sort = {active: 'nrSwiadectwa', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.refresh();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item, property) => {
      // property = this.sortBy;
       // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
    switch (property) {
      case 'nrSwiadectwa': {
        // console.log(property);
        if (item.nrSwiadectwa.length === 6){ return ('000' + item.nrSwiadectwa); }
        if (item.nrSwiadectwa.length === 7){ return ('00' + item.nrSwiadectwa); }
        if (item.nrSwiadectwa.length === 8){ return ('0' + item.nrSwiadectwa); }
        return item.nrSwiadectwa;
        }

      default: {
        // console.log('Inside default sort');
        // console.log(item);
        return item[property];
        }
      }
    };

  }

  refresh(){
    this.isDataLoaded = false;
    this.instrumentService.get(this.data).subscribe( data => {
      this.instrument = data;
      this.isDataLoaded = true;
      const sorted = data.swiadectwa.sort((a, b) => a.id - b.id);
      this.dataSource.data = sorted;
      console.log(data);
      const title1 = '0' + this.instrument.idGrupa.nrGrupy;
      const title2 = '000' + this.instrument.nr;
      this.title = 'ZPL.' + title1.slice(-2) + '.' + title2.slice(-4) + ' ' + this.instrument.nazwa;
    });
    // this.paginator._intl.itemsPerPageLabel = 'Wyników na stronie:';
    // this.paginator._intl.nextPageLabel = 'Następna strona';
    // this.paginator._intl.previousPageLabel = 'Poprzednia strona';
    // this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    //   if (length === 0 || pageSize === 0) { return `0 z ${length}`; }
    //   length = Math.max(length, 0);
    //   const startIndex = page * pageSize;
    //   const endIndex = startIndex < length ?
    //       Math.min(startIndex + pageSize, length) :
    //       startIndex + pageSize;

    //   return `${startIndex + 1} – ${endIndex} z ${length}`;
    // };
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  highlight(row?: any) {
    if (this.selection.selected.length === 1){
      this.selectedRowIndex = this.selection.selected[0].id;
    }else{
      this.selectedRowIndex = -1;
    }
    // this.selectedRowIndex = row.id;
    // console.log(this.selectedRowIndex);
  }

  editInstrumentData(){
    // listInstrument: ListInstrumentComponent;
    // ListInstrumentComponent.openDialogAdd(this.instrument);
    const dialogRef = this.dialog.open(AddinstrumentComponent, {
      width: '550px',
      height: '800px',
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: this.instrument
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selection.clear();
      // this.highlight(-1);
      this.refresh();
    });
  }

  openCertificate(idCert: number){
    console.log(idCert);
    this.cetrificateService.downloadCertificatePDF(idCert);
    // const pdf = new CertificateToPdf();
    // pdf.createTest();
  }

  openMeasurementCard(row: Certificate){
    const link = document.createElement('a');
    link.download = row.plik[0].nazwa;
    this.cetrificateService.downloadFile(row.plik[0].link).subscribe( blob => {
      link.href = URL.createObjectURL(blob);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    });
  }

  addCertificate(){
    // listInstrument: ListInstrumentComponent;
    // ListInstrumentComponent.openDialogAdd(this.instrument);
    const dialogRef = this.dialog.open(CertificateDialogComponent, {
      panelClass: 'mat-dialog-bg',
      position: {
        top: '80px',
      },
      hasBackdrop: true,
      disableClose: true,
      data: this.instrument.id
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selection.clear();
      // this.highlight(-1);
      this.refresh();
    });
  }
}
