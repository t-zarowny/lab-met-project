import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    getUser(id: number){
      return this.http.get<User>(`${environment.apiUrl}users/${id}/`);
    }
    getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}users/`);
    }

    addUser(user: FormData) {
        return this.http.post(`${environment.apiUrl}users/`, user);
    }

    editUser(id: number, user: FormData) {
      return this.http.put(`${environment.apiUrl}users/${id}/`, user);
    }

    passUser(id: number, user: FormData) {
      return this.http.put(`${environment.apiUrl}users-pass/${id}/`, user);
    }

    delete(id: number) {
      return this.http.delete(`${environment.apiUrl}users/${id}/`);
    }
}
