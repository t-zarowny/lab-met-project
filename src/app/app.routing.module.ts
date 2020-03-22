import {NgModule} from '@angular/core';
import { Routes , RouterModule} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AddinstrumentComponent} from './addinstrument/addinstrument.component';
import {ListinstrumentComponent} from './listinstrument/listinstrument.component';

const appRoutes: Routes = [
  {
    path: 'desktop',
    component: DesktopComponent
  },
  {
    path: 'addinstrument',
    component: AddinstrumentComponent
  },
  {
    path: 'listinstrument',
    component: ListinstrumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}