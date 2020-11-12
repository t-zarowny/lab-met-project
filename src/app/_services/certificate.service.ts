import { Certificate } from './../_models/certificate';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  url = 'swiadectwo-sprawdzenia';
  urlNr = 'swiadectwo-sprawdzenia-min';
  urlFile = 'swiadectwo-sprawdzenia-plik';
  urlTemplate = 'swiadectwo-sprawdzenia-szablon';

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<Certificate>(`${environment.apiUrl}${this.url}/${id}/`);
  }
  getAllNr(){
    return this.http.get<any[]>(`${environment.apiUrl}${this.urlNr}/`);
  }
  getAll() {
    return this.http.get<Certificate[]>(`${environment.apiUrl}${this.url}/`);
  }
  add(data: FormData) {
    return this.http.post<Certificate>(`${environment.apiUrl}${this.url}/`, data);
  }
  addFile(data: FormData) {
    return this.http.post(`${environment.apiUrl}${this.urlFile}/`, data);
  }
  addTemplate(data: FormData) {
    return this.http.post(`${environment.apiUrl}${this.urlTemplate}/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}${this.url}/${id}/`, data);
  }
  editTemplate(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}${this.urlTemplate}/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.url}/${id}/`);
  }
  deleteFile(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.urlFile}/${id}/`);
  }
}
