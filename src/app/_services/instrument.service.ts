import { Instrument, InstrumentFull } from './../_models/instrument';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<InstrumentFull>(`${environment.apiUrl}przyrzady-full/${id}/`);
  }
  getAll() {
    return this.http.get<InstrumentFull[]>(`${environment.apiUrl}przyrzady-full/`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}przyrzady/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}przyrzady/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}przyrzady/${id}/`);
  }
}
