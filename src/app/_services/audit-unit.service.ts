import { AuditUnit } from './../_models/auditUnit';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditUnitService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<AuditUnit>(`${environment.apiUrl}JednostkiBadane/${id}/`);
  }
  getAll() {
    return this.http.get<AuditUnit[]>(`${environment.apiUrl}JednostkiBadane/`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}JednostkiBadane/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}JednostkiBadane/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}JednostkiBadane/${id}/`);
  }
}
