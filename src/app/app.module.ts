import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DbService } from './services/db.service';
import { MenuComponent } from './menu/menu.component';
import { BarComponent } from './bar/bar.component';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { AddinstrumentComponent } from './addinstrument/addinstrument.component';
import { ListinstrumentComponent } from './listinstrument/listinstrument.component';
import { DesktopComponent } from './desktop/desktop.component';
import { AppRoutingModule } from './app.routing.module';
import { ListusersComponent } from './listusers/listusers.component';
import { GroupinstrumentsComponent } from './groupinstruments/groupinstruments.component';
import { AddGroupComponent } from './add-group/add-group.component';

registerLocaleData(localePl);
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BarComponent,
    AddinstrumentComponent,
    ListinstrumentComponent,
    DesktopComponent,
    ListusersComponent,
    GroupinstrumentsComponent,
    AddGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
