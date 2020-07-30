import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupInstrument, MeasurementCardTemplate } from 'src/app/assistant/interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/_services/db.service';
import { AddGroupComponent } from 'src/app/group/add-group/add-group.component';
import { MeasurementCardsDialogComponent } from '../measurement-cards-dialog/measurement-cards-dialog.component';

@Component({
  selector: 'app-measurement-cards',
  templateUrl: './measurement-cards.component.html',
  styleUrls: ['./measurement-cards.component.css']
})
export class MeasurementCardsComponent implements OnInit {

  constructor(public dialog: MatDialog, private db: DbService) {
  }

  ngOnInit(): void {}

}
