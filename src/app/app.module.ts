import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { DbService } from './_services/db.service';
import { MenuComponent } from './menu/menu.component';
import { BarComponent } from './menu/bar/bar.component';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { AddinstrumentComponent } from './instrument/add-instrument/add-instrument.component';
import { ListInstrumentComponent } from './instrument/list-instrument.component';
import { DesktopComponent } from './desktop/desktop.component';
import { AppRoutingModule } from './app.routing.module';
import { ListusersComponent } from './users/listusers.component';
import { GroupinstrumentsComponent } from './group/group.component';
import { AddGroupComponent} from './group/add-group/add-group.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MeasurementCardsComponent } from './documents/measurement-cards/measurement-cards.component';
import { MeasurementCardsDialogComponent } from './documents/measurement-cards-dialog/measurement-cards-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

registerLocaleData(localePl);
@NgModule({

  declarations: [
    AppComponent,
    MenuComponent,
    BarComponent,
    AddinstrumentComponent,
    ListInstrumentComponent,
    DesktopComponent,
    ListusersComponent,
    GroupinstrumentsComponent,
    AddGroupComponent,
    MeasurementCardsComponent,
    MeasurementCardsDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CKEditorModule, MatIconModule, MatTooltipModule,
    MatPaginatorModule, MatTableModule, MatTabsModule, MatSortModule, MatCheckboxModule
  ],
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  providers: [DbService,
      {
        provide: LOCALE_ID,
        useValue: 'pl-PL'
      },
      {
        provide: MatDialogRef,
        useValue: {}
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }
     ],
  bootstrap: [AppComponent],
  entryComponents: [AddGroupComponent, MeasurementCardsDialogComponent, ConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
