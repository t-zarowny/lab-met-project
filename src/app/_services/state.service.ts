import { State } from './../_models/state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<State>(`${environment.apiUrl}statusy/${id}/`);
  }
  getAll() {
    return this.http.get<State[]>(`${environment.apiUrl}statusy/`);
  }
}
