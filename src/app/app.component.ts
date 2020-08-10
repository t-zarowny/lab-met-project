import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './login/_services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lab-app';
  isAuthenticated = false;


  constructor( private auth: AuthenticationService ){
    this.auth.currentToken.subscribe(data => {
      this.isAuthenticated = !!data;
    });
  }

  ngOnInit(){
  }
}
