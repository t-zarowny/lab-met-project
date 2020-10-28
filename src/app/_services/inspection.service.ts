import { environment } from 'src/environments/environment';
import { Inspection } from './../_models/inspection';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<Inspection>(`${environment.apiUrl}sprawdzenia-planowane/${id}/`);
  }
  getAll() {
    return this.http.get<Inspection[]>(`${environment.apiUrl}sprawdzenia-planowane/`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}sprawdzenia-planowane/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}sprawdzenia-planowane/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}sprawdzenia-planowane/${id}/`);
  }
}
