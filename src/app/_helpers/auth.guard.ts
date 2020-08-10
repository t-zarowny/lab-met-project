import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { AuthenticationService } from '../login/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentToken = this.authenticationService.currentTokenValue;
      if (currentToken) {
          return true;
      }
      this.router.navigate(['/logowanie'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
