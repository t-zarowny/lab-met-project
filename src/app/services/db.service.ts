import { Injectable, OnInit } from '@angular/core';
import {GroupInstrument, Menu} from '../assistant/interfaces';
import { Subject, Observable } from 'rxjs';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DbService implements OnInit {

  // menuOb:Menu;
  menu = new Array<Menu>();
  groupInstrumentArray = new Array <GroupInstrument>();

  private groupInstrumentArrayObs = new Subject<GroupInstrument[]>();


  constructor() {
    const jsonmenu = '[{ "id": 0,'
                  + '  "catName":"System", '
                  + '  "item": ['
                  + '           {"name":"Pulpit", '
                  + '            "alias":"desktop", '
                  + '            "access":0},'
                  + '           {"name":"Użytkownicy", '
                  + '            "alias":"listusers", '
                  + '            "access":0}'
                  + '          ]'
                  + '},'
                  + '{ "id": 1,'
                  + '  "catName":"Przyrządy", '
                  + '  "item": ['
                  + '           {"name":"Grupy przyrządów", '
                  + '            "alias":"listgroup", '
                  + '            "access":0},'
                  + '           {"name":"Dodaj przyrząd", '
                  + '            "alias":"addinstrument", '
                  + '            "access":0},'
                  + '           {"name":"Lista przyrządów", '
                  + '            "alias":"listinstrument", '
                  + '            "access":0}'
                  + '          ]'
                  + '}]';
    this.menu = JSON.parse(jsonmenu);
    // console.log(this.menu);
    this.addNewGroup({id: 0, name: 'Grupa testowa 1', controlMethod: 'IK-0-0-0', measurementCardTemplateId: 1});
    this.addNewGroup({id: 1, name: 'Grupa testowa 2', controlMethod: 'IK-0-0-1', measurementCardTemplateId: 2});
   }

   addNewGroup(g: GroupInstrument) {

    if (g.id === undefined) {
      const gn: GroupInstrument = { id: this.groupInstrumentArray.length,
                                  name: g.name,
                                  controlMethod: g.controlMethod,
                                  measurementCardTemplateId: g.measurementCardTemplateId
                                };
      this.groupInstrumentArray.push(gn);
    } else {
      const index = this.groupInstrumentArray.findIndex
      (
       x => x.id === g.id
      );
      index !== -1 ? this.groupInstrumentArray.splice(index, 1, g) : this.groupInstrumentArray.push(g);
    }
    this.groupInstrumentArrayObs.next(this.groupInstrumentArray);
   }
   getListGroup(): Observable<GroupInstrument[]> {
      return this.groupInstrumentArrayObs.asObservable();
   }

   // tslint:disable-next-line: contextual-lifecycle
   ngOnInit() {}
}




