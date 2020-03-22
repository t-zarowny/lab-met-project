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

  menuOb:Menu;

  constructor() {
    let jsonmenu0 ='{ "id": 0,'
                  +'  "catName":"Przyrządy", '
                  +'  "item": ['
                  +'           {"name":"Dodaj przyrząd", '
                  +'            "alias":"dodajprzyrzad", '
                  +'            "access":0},'
                  +'           {"name":"Wyświetl", '
                  +'            "alias":"wyswietl", '
                  +'            "access":0}'                  
                  +'          ]'
                  +'}';
    this.menuOb = JSON.parse(jsonmenu0);
    //console.log(this.menuOb);
   }

   ngOnInit(){

   }
}




