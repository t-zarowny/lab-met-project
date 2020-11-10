import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule, MatIconRegistry, MatIcon} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';





@NgModule({
    declarations: [],
    imports: [
    CommonModule,
    ],
    exports: [
      MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule,
      MatPaginatorModule, MatTableModule, MatTabsModule, MatSortModule, MatCheckboxModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule, MatSlideToggleModule,
      MatTooltipModule,
      MatSelectModule,
      DragDropModule,
      MatGridListModule,
      MatDividerModule,
      MatProgressSpinnerModule,
      MatBadgeModule,
      MatRadioModule,
      MatChipsModule
    ],
    entryComponents: [],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }
    ]
})
export class AppMaterialModule {}
