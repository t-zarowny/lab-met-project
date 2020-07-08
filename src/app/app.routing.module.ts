import {NgModule} from '@angular/core';
import { Routes , RouterModule} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AddinstrumentComponent} from './instrument/add-instrument/add-instrument.component';
import {ListInstrumentComponent} from './instrument/list-instrument.component';
import {ListusersComponent} from './users/listusers.component';
import {GroupinstrumentsComponent} from './group/group.component';
import {MeasurementCardsComponent} from './documents/measurement-cards/measurement-cards.component';
import {AddGroupComponent} from './group/add-group/add-group.component';

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
    component: ListInstrumentComponent
  },
    {
    path: 'listusers',
    component: ListusersComponent
  },
    {
    path: 'listgroup',
    component: GroupinstrumentsComponent
  },
  {
    path: 'measurementcards',
    component: MeasurementCardsComponent
  },
  {
    path: '',
    redirectTo: '/desktop',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
