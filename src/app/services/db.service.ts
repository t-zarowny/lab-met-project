import { Injectable, OnInit } from '@angular/core';

interface MenuItems {
  name: string;
  alias: string;
  access: number;
}

export interface Menu {
  id: number;
  catName: string;
  item?: MenuItems[] | null;
}


@Injectable({
  providedIn: 'root'
})
export class DbService implements OnInit{

  //menuOb:Menu;
  menu = new Array<Menu>();

  constructor() {
    let jsonmenu ='{ "id": 0,'
                  +'  "catName":"System", '
                  +'  "item": ['
                  +'           {"name":"Pulpit", '
                  +'            "alias":"desktop", '
                  +'            "access":0},'
                  +'           {"name":"Użytkownicy", '
                  +'            "alias":"listusers", '
                  +'            "access":0}'                  
                  +'          ]'
                  +'}';
    this.menu.push(JSON.parse(jsonmenu));
    jsonmenu ='{ "id": 1,'
                  +'  "catName":"Przyrządy", '
                  +'  "item": ['
                  +'           {"name":"Grupy przyrządów", '
                  +'            "alias":"listgroup", '
                  +'            "access":0},'   
                  +'           {"name":"Dodaj przyrząd", '
                  +'            "alias":"addinstrument", '
                  +'            "access":0},'
                  +'           {"name":"Lista przyrządów", '
                  +'            "alias":"listinstrument", '
                  +'            "access":0}'                  
                  +'          ]'
                  +'}';
    this.menu.push(JSON.parse(jsonmenu));
    //console.log(this.menuOb);
   }

   ngOnInit(){

   }
}




