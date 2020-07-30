import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeasurementCardTemplate } from 'src/app/assistant/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from 'src/app/_services/db.service';

@Component({
  selector: 'app-measurement-cards-dialog',
  templateUrl: './measurement-cards-dialog.component.html',
  styleUrls: ['./measurement-cards-dialog.component.css']
})
export class MeasurementCardsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MeasurementCardsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MeasurementCardTemplate,
              private db: DbService) { }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
