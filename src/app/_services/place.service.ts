import { PlaceFull } from './../_models/place';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Place } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<Place>(`${environment.apiUrl}lokalizacje/${id}/`);
  }
  getAll() {
    return this.http.get<PlaceFull[]>(`${environment.apiUrl}lokalizacje/`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}lokalizacje/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}lokalizacje/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}lokalizacje/${id}/`);
  }
}
