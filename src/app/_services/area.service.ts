import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area, AreaFull } from './../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<Area>(`${environment.apiUrl}obszary/${id}/`);
  }
  getAll() {
    return this.http.get<AreaFull[]>(`${environment.apiUrl}obszary-d1/`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}obszary/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}obszary/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}obszary/${id}/`);
  }
}
