import { Menu } from '../assistant/interfaces';

export class MenuData {
  menu = new Array<Menu>();

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
      + '  "catName":"Laboratorium", '
      + '  "item": ['
      + '           {"name":"Przyrządy", '
      + '            "alias":"listinstrument", '
      + '            "access":0},'
      + '           {"name":"Grupy przyrządów", '
      + '            "alias":"listgroup", '
      + '            "access":0},'
      + '           {"name":"Obszary", '
      + '            "alias":"listarea", '
      + '            "access":0}'
      // + '           {"name":"Dodaj przyrząd", '
      // + '            "alias":"addinstrument", '
      // + '            "access":0}'
      + '          ]'
      + '}'
      // + '{ "id": 2,'
      // + '  "catName":"Dokumenty", '
      // + '  "item": ['
      // + '           {"name":"Karty pomiarów", '
      // + '            "alias":"measurementcards", '
      // + '            "access":0}'
      // + '          ]'
      // + '}'
      + ']';
    this.menu = JSON.parse(jsonmenu);
  }

  public menu_list() {
    return this.menu;
  }
}
