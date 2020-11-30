import { Certificate } from './../_models/certificate';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  url = 'swiadectwo-sprawdzenia';
  urlNr = 'swiadectwo-sprawdzenia-min';
  urlFile = 'swiadectwo-sprawdzenia-plik';
  urlTemplate = 'swiadectwo-sprawdzenia-szablon';
  urlTimetable = 'swiadectwo-sprawdzenia-harmonogram';

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<Certificate>(`${environment.apiUrl}${this.url}/${id}/`);
  }
  getLastNr(){
    return this.http.get<any>(`${environment.apiUrl}${this.urlNr}/`);
  }
  getAll() {
    return this.http.get<Certificate[]>(`${environment.apiUrl}${this.url}/`);
  }
  getBetweenDates(startDate: string, endDate: string, id?: number) {
    let param = '?min_date=' + startDate + '&max_date=' + endDate;
    param = id ? param + '&przedmiotId=' + id : param;
    return this.http.get<Certificate[]>(`${environment.apiUrl}${this.urlTimetable}/${param}`);
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
  downloadFile(url): Observable<Blob> {
    return this.http.get(url, {responseType: 'blob'});
  }

  public downloadCertificatePDF(idCertificate: number){
    this.get(idCertificate).subscribe( data => {
      console.log(data);
      const doc = new jsPDF({
        orientation: 'portrait',
        format: 'a4',
        unit: 'mm'
      });
      doc.setProperties({
        title: data.nrSwiadectwa + '.pdf'
      });
      let h = 80;
      let w = 70;
      doc.rect(15, 15, 180, 267);
      doc.addImage('../assets/zehnder_logo.png', 'PNG', 20, 20, 31, 19);
      doc.addFont('../assets/fonts/DejaVuSans-Bold.ttf', 'DejaVuSans-Bold', 'normal');
      doc.addFont('../assets/fonts/DejaVuSans.ttf', 'DejaVuSans', 'normal');
      doc.addFont('../assets/fonts/arial.ttf', 'arial', 'normal');
      doc.setFont('DejaVuSans-Bold');
      doc.text('ŚWIADECTWO SPRAWDZENIA', 105, 50, { align: 'center'});
      doc.setFont('DejaVuSans');
      doc.setFontSize(12);
      doc.text('Nr świadectwa:', 104, 66, { align: 'right'});
      doc.setFontSize(14);
      doc.text(data.nrSwiadectwa, 106, 66, { align: 'left'});
      doc.line(20, 68, 190, 68);
      doc.setFont('DejaVuSans-Bold');
      doc.setFontSize(10);
      h = 80;
      doc.text('PRZEDMIOT', w, h, { align: 'right'});
      doc.text('SPRAWDZENIA', w, h + 5, { align: 'right'});
      h = 110;
      doc.text('METODA', w, h, { align: 'right'});
      doc.text('SPRAWDZENIA', w, h + 5, { align: 'right'});
      h = 135;
      doc.text('UŻYTE WZORCE', w, h, { align: 'right'});
      h = 155;
      doc.text('WARUNKI', w, h, { align: 'right'});
      doc.text('ŚRODOWISKOWE', w, h + 5, { align: 'right'});
      h = 180;
      doc.text('DATA KONTROLI', w, h, { align: 'right'});
      // doc.text('KONTROLI', 60, h + 5, { align: 'right'});
      h = 195;
      doc.text('DATA NAST. KONTROLI', w, h, { align: 'right'});
      // doc.text('NAST. KONTROLI', w, h + 5, { align: 'right'});
      h = 210;
      doc.text('WYNIK KONTROLI', w, h, { align: 'right'});
      h = 225;
      doc.text('UWAGI', w, h, { align: 'right'});

      w = 75;
      doc.setFont('DejaVuSans');
      doc.setFontSize(10);
      let valSplit = data.przedmiot.split('<br>');
      h = 80;
      valSplit.forEach(val => {
        doc.text(val , w, h, { align: 'left', maxWidth: '110'});
        h += 6;
      });
      h = 110;
      doc.text(data.metoda , w, h, { align: 'left'});
      h = 135;
      doc.text(data.uzyteWzorce , w, h, { align: 'left', maxWidth: '110'});
      h = 155;
      valSplit = data.warunkiSrodowiskowe.split('<br>');
      doc.text(valSplit[0] + '°C', w, h, { align: 'left'});
      h += 6;
      doc.text(valSplit[1], w, h, { align: 'left'});
      h = 180;
      doc.text(data.dataSprawdzenia , w, h, { align: 'left'});
      h = 195;
      doc.text(data.dataNastepnejKontroli , w, h, { align: 'left'});
      h = 210;
      const wynik = data.wynikSprawdzenia ? 'POZYTYWNY' : 'NEGATYWNY';
      doc.text(wynik , w, h, { align: 'left'});
      h = 225;
      doc.text(data.uwagi , w, h, { align: 'left', maxWidth: '110'});
      doc.line(130, 270, 180, 270);
      doc.setFontSize(7);
      doc.text('Sprawdzający', 155, 273, { align: 'center'});
      doc.setFontSize(10);
      doc.text(data.sprawdzajacy, 155, 268, { align: 'center'});

      doc.save(data.nrSwiadectwa + '.pdf');
    });

  }

}
