import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeasurementCardsComponent } from './documents/measurement-cards/measurement-cards.component';
import { MeasurementCardsDialogComponent } from './documents/measurement-cards-dialog/measurement-cards-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppMaterialModule } from './shared/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginModule } from './login/login.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AlertComponent } from './_component/alert/alert.component';
import { AuthenticationService } from './login/_services';
import { FormUserComponent } from './users/form-user/form-user.component';
import { FormUserChangePassComponent } from './users/form-user-change-pass/form-user-change-pass.component';

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
    ConfirmDialogComponent,
    AlertComponent,
    FormUserComponent,
    FormUserChangePassComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    LoginModule
  ],
  exports: [FormsModule],
  providers: [DbService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      {
        provide: LOCALE_ID,
        useValue: 'pl-PL'
      },

     ],
  bootstrap: [AppComponent],
  entryComponents: [AddGroupComponent, MeasurementCardsDialogComponent, ConfirmDialogComponent, FormUserComponent,
                    FormUserChangePassComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
