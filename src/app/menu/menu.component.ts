import { Component, OnInit } from '@angular/core';
import { DbService} from '../_services/db.service';
import {Menu} from '../assistant/interfaces';
import { User } from 'src/app/_models';
import { AuthenticationService } from '../login/_services';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: User;
  isAuthenticated = false;
  menu = new Array<Menu>();


  constructor(private db: DbService, private auth: AuthenticationService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private router: Router) {
    iconRegistry.addSvgIcon('account_box', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/account_box-white-48dp.svg'));
    iconRegistry.addSvgIcon('logout', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logout.svg'));
    this.menu = this.db.menu;
   }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/logowanie']);
  }


}
