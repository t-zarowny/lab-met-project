import { UserService } from './../../_services';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User, Token } from '../../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private currentTokenSubject: BehaviorSubject<Token>;
    public currentToken: Observable<Token>;
    private refreshTokenTimeout: number;
    private t: Token;

    constructor(private http: HttpClient, private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
        this.currentToken = this.currentTokenSubject.asObservable();
        this.t = new Token();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentTokenValue(): Token {
      return this.currentTokenSubject.value;
    }


    login(username: string, password: string) {
        return this.http.post<any>(environment.apiUrlToken, { username, password })
            .pipe(map(data => {
                // console.log(data);
                this.decodeToken(data);
                this.userService.getUser(this.currentTokenSubject.value.userId)
                .pipe(map(user => {
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  // console.log(user);
                }))
                .subscribe();
                return data;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentToken');
        this.stopRefreshTokenTimer();
        this.currentUserSubject.next(null);
        this.currentTokenSubject.next(null);
    }

    private decodeToken(data) {
      if (data.refresh){
        this.t.refreshToken = data.refresh;
      }
      this.t.accessToken = data.access;
      const accessTokenParts = this.t.accessToken.split(/\./);
      const accessTokenDecoded = JSON.parse(window.atob(accessTokenParts[1]));
      this.t.accessTokenExpires = new Date(accessTokenDecoded.exp * 1000);
      this.t.userId = accessTokenDecoded.user_id;
      localStorage.setItem('currentToken', JSON.stringify(this.t));
      this.currentTokenSubject.next(this.t);
      this.startRefreshTokenTimer();
      // console.log(this.t);
    }

    refreshToken() {
      const formData = new FormData();
      console.log('this.currentTokenValue.refreshToken:' + this.currentTokenValue.refreshToken);
      // formData.append('refresh', this.currentTokenValue.refreshToken);
      formData.append('refresh', this.currentTokenValue.refreshToken);
      return this.http.post<any>(environment.apiUrlTokenRefresh, formData)
          .pipe(map((data) => {
            this.decodeToken(data);
            console.log(data);
            return data;
          }));
    }

    private startRefreshTokenTimer() {
        const timeout = this.currentTokenValue.accessTokenExpires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
