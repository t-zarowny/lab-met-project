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
    doc.cellInitialize();

    let d = doc.getTextDimensions('dsasadsad');
    console.log('dim:');
    console.log(d);
    doc.cell(20, 30, 40, 10, 'Numer', 0, 'center');
    doc.cell(60, 30, 60, 10, 'Nazwa1', 1, 'right');
    doc.cell(60, 30, 60, 10, '', 2, 'right');
    const html = `<table class="timetab1" id="elementH">
                  <tr>
                    <th rowspan="2">Numer</th>
                    <th rowspan="2">Nazwa przyrządu</th>
                    <th colspan="12">Harmonogram sprawdzeń na rok 2020</th>
                  </tr>
                  <tr>
                    <th class="col-month">I</th>
                    <th class="col-month">II</th>
                    <th class="col-month">III</th>
                    <th class="col-month">IV</th>
                    <th class="col-month">V</th>
                    <th class="col-month">VI</th>
                    <th class="col-month">VII</th>
                    <th class="col-month">VIII</th>
                    <th class="col-month">IX</th>
                    <th class="col-month">X</th>
                    <th class="col-month">XI</th>
                    <th class="col-month">XII</th>
                  </tr>
                </table>`;
    var specialElementHandlers = {
      '#elementH': function (element, renderer) {
        return true;
      }
    };
    // doc.fromHTML(html, 10, 10);
    doc.fromHTML(html, 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
  });



    doc.save('Harmonogram_roczny_' + year + '.pdf');
  }
}
