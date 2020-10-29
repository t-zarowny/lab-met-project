import { MeasurementCard, GroupInstrument } from './../_models';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  addNew(form: FormData){
    return this.http.post<any>(environment.apiUrl + 'grupy/', form)
      .pipe(tap(console.log));
  }

  getList() {
    return this.http.get<GroupInstrument[]>(environment.apiUrl + 'grupy/')
      .pipe(tap(data => JSON.stringify(data as GroupInstrument[])));
  }

  delete(id: number) {
    const url = `${environment.apiUrl}grupy/${id}/`;
    return this.http.delete(url)
      .pipe(tap(console.log));
  }

  update(id: number, form: FormData){
    const url = `${environment.apiUrl}grupy/${id}/`;
    return this.http.put<any>(url, form)
      .pipe(tap(console.log));
  }
  addNewFile(form: FormData){
    return this.http.post<MeasurementCard>(environment.apiUrl + 'karta-pomiarow/', form)
      .pipe(tap(console.log));
  }
  deleteFile(id: number){
    return this.http.delete<MeasurementCard>(`${environment.apiUrl}karta-pomiarow/${id}/`)
      .pipe(tap(console.log));
  }
}
