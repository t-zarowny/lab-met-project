import { Injectable, OnInit } from '@angular/core';
import {GroupInstrument, Menu, MeasurementCardTemplate} from '../assistant/interfaces';
import { Subject, Observable } from 'rxjs';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DbService implements OnInit {

  // menuOb:Menu;
  menu = new Array<Menu>();

  public groupInstrumentArray = new Array <GroupInstrument>();
  private groupInstrumentArrayObs = new Subject<GroupInstrument[]>();

  public measurementCardArray = new Array <MeasurementCardTemplate>();
  private measurementCardObs = new Subject<MeasurementCardTemplate[]>();

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
                  + '},'
                  + '{ "id": 2,'
                  + '  "catName":"Dokumenty", '
                  + '  "item": ['
                  + '           {"name":"Karty pomiarów", '
                  + '            "alias":"measurementcards", '
                  + '            "access":0}'
                  + '          ]'
                  + '}'
                  + ']';
    this.menu = JSON.parse(jsonmenu);

    this.addNewGroup({id: 0, name: 'Grupa testowa 1', controlMethod: 'IK-0-0-0', measurementCardTemplateId: 1});
    this.addNewGroup({id: 1, name: 'Grupa testowa 2', controlMethod: 'IK-0-0-1', measurementCardTemplateId: 2});

    this.addNewMeasurementCard({id: 0,
                                documentNo: 'F-128',
                                title: 'Ciśnieniomierze wskazówkowe z elemtami sprężystymi',
                                template: '<p>Template</p>'});
    this.addNewMeasurementCard({id: 1,
                                  documentNo: 'F-142',
                                  title: 'Mikrometry',
                                  template: '<p>Template</p>'});
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
   addNewMeasurementCard(c: MeasurementCardTemplate) {

    if (c.id === undefined) {
      const cn: MeasurementCardTemplate = { id: this.groupInstrumentArray.length,
                                            documentNo: c.documentNo,
                                            title: c.title,
                                            template: c.template
                                          };
      this.measurementCardArray.push(cn);
    } else {
      const index = this.measurementCardArray.findIndex
      (
       x => x.id === c.id
      );
      index !== -1 ? this.measurementCardArray.splice(index, 1, c) : this.measurementCardArray.push(c);
    }
    this.measurementCardObs.next(this.measurementCardArray);
   }
   // tslint:disable-next-line: contextual-lifecycle
   ngOnInit() {}

  getListMeasurementCard(): Observable<MeasurementCardTemplate[]> {
      return this.measurementCardObs.asObservable();
  }
}




