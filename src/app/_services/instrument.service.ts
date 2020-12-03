import { Instrument, InstrumentFull } from './../_models/instrument';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<InstrumentFull>(`${environment.apiUrl}przyrzady-full/${id}/`);
  }
  getAllPattern(){
    return this.http.get<InstrumentFull[]>(`${environment.apiUrl}przyrzady-wzorce/`);
  }
  getAll(param: string = '') {
    return this.http.get<InstrumentFull[]>(`${environment.apiUrl}przyrzady-full/${param}`);
  }
  getAllNr() {
    return this.http.get<any[]>(`${environment.apiUrl}przyrzady-nr/`);
  }
  getAllTimetab(param: string = '') {
    return this.http.get<Instrument[]>(`${environment.apiUrl}przyrzady-harmonogram/${param}`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}przyrzady/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}przyrzady/${id}/`, data);
  }
  updateDate(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}przyrzady-daty/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}przyrzady/${id}/`);
  }
createHeaders(keys) {
  let result = [];
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: 'center',
      padding: 0
    });
  }
  return result;
  }


downloadTimetable(ins: Instrument[], year: string): void{
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
      unit: 'mm'
    });
    doc.setProperties({
      title: 'Harmonogram_roczny_' + year + '.pdf'
    });
    doc.addImage('../assets/zehnder_logo.png', 'PNG', 20, 10, 23, 14);
    doc.addFont('../assets/fonts/DejaVuSans-Bold.ttf', 'DejaVuSans-Bold', 'normal');
    doc.addFont('../assets/fonts/DejaVuSans.ttf', 'DejaVuSans', 'normal');
    doc.addFont('../assets/fonts/arial.ttf', 'arial', 'normal');
    doc.setFont('DejaVuSans-Bold');
    doc.setFontSize(12);
    doc.text('HARMONOGRAM KONTROLI NA ROK ' + year, 125, 25, { align: 'center'});
    doc.setFont('DejaVuSans');
    doc.setFontSize(12);
    doc.text('Data wydruku: ' + new Date().toLocaleDateString() + 'r.', 277, 25, { align: 'right'});
    doc.setLineWidth(0.25);
    doc.line(20, 27, 277, 27);
    doc.cell(20, 30, 40, 10, 'Numer', 1, 'center');
    doc.cell(60, 30, 60, 10, 'Nazwa', 1, 'right');
    const headers = this.createHeaders([
      'nrString',
      'nazwa',
      'sprawdzeniaPlanoweGru',
      'sprawdzeniaPlanoweLis',
      'sprawdzeniaPlanoweMar',
      'sprawdzeniaPlanoweKwi',
      'sprawdzeniaPlanoweMaj'
    ]);
    doc.table(20, 40, ins, headers, { autoSize: true });


    doc.save('Harmonogram_roczny_' + year + '.pdf');
  }
}
