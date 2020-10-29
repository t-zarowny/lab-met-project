import {NgModule} from '@angular/core';
import { Routes , RouterModule} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AddinstrumentComponent} from './instrument/add-instrument/add-instrument.component';
import {ListInstrumentComponent} from './instrument/list-instrument.component';
import {ListusersComponent} from './users/listusers.component';
import {GroupinstrumentsComponent} from './group/group.component';
import {AddGroupComponent} from './group/add-group/add-group.component';
import {AreaComponent} from './area/area.component';
import { AuthGuard } from './_helpers';


const appRoutes: Routes = [
  {
    path: 'desktop',
    component: DesktopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addinstrument',
    component: AddinstrumentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listinstrument',
    component: ListInstrumentComponent,
    canActivate: [AuthGuard]
  },
    {
    path: 'listusers',
    component: ListusersComponent,
    canActivate: [AuthGuard]
  },
    {
    path: 'listgroup',
    component: GroupinstrumentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listarea',
    component: AreaComponent,
    canActivate: [AuthGuard]
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
