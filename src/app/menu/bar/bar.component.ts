import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../login/_services';
import { User } from 'src/app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  CurrentDate = new Date();
  user: User;
  userFirstName = null;
  isAuthenticated = false;

  constructor(private auth: AuthenticationService, private router: Router) {
   }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
      if (user){
        // this.user = user;
        this.isAuthenticated = true;
        // this.userFirstName = user.firstName;
        // console.log(`First name: ${this.user}`);
        // console.log(this.user.username);
      }else{
        this.isAuthenticated = false;
      }
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/logowanie']);
  }

}
