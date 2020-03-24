import { Injectable, OnInit } from '@angular/core';
import {Menu} from '../interfaces/menu';
import {GroupInstrument} from '../interfaces/groupInstrument';

@Injectable({
  providedIn: 'root'
})
export class DbService implements OnInit{

  //menuOb:Menu;
  menu = new Array<Menu>();
  groupInstrumentArray = new Array <GroupInstrument>();

  constructor() {
    let jsonmenu ='[{ "id": 0,'
                  +'  "catName":"System", '
                  +'  "item": ['
                  +'           {"name":"Pulpit", '
                  +'            "alias":"desktop", '
                  +'            "access":0},'
                  +'           {"name":"Użytkownicy", '
                  +'            "alias":"listusers", '
                  +'            "access":0}'                  
                  +'          ]'
                  +'},'
                  +'{ "id": 1,'
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
                  +'}]';
    this.menu = JSON.parse(jsonmenu);
    //console.log(this.menu);
   }

   ngOnInit(){

   }
}




