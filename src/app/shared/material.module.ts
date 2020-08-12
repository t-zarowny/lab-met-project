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


@NgModule({
    declarations: [],
    imports: [
    CommonModule,
    ],
    exports: [
      MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule,
      MatPaginatorModule, MatTableModule, MatTabsModule, MatSortModule, MatCheckboxModule,
      MatDialogModule, MatSlideToggleModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatTooltipModule
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
