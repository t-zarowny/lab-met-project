import { IntervalUnit } from './../_models/intervalUnit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntervalUnitService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<IntervalUnit>(`${environment.apiUrl}JednostkiInterwal/${id}/`);
  }
  getAll() {
    return this.http.get<IntervalUnit[]>(`${environment.apiUrl}JednostkiInterwal/`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}JednostkiInterwal/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}JednostkiInterwal/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}JednostkiInterwal/${id}/`);
  }
}
