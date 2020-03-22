import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DbService } from './services/db.service';
import { MenuComponent } from './menu/menu.component';
import { BarComponent } from './bar/bar.component';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePl);
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
