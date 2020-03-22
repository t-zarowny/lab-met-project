import { Component, OnInit } from '@angular/core';
import { DbService, Menu } from '../services/db.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu = new Array<Menu>();
 

  constructor(private db: DbService) {
    //this.menu.push(this.db.menuOb);
    this.menu = this.db.menu;
   }

  ngOnInit(): void {
  }

}
