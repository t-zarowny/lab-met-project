import { CustomFonts } from './../_helpers/custom.fonts';
import { Instrument, InstrumentFull } from './../_models/instrument';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';

import 'jspdf-autotable';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

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
    doc.addFileToVFS('arial-normal.ttf', CustomFonts.arialNormal);
    doc.addFont('arial-normal.ttf', 'arial', 'normal');
    doc.addFileToVFS('DejaVuSans-Bold-normal.ttf', CustomFonts.dejaVuSansBoldNormal);
    doc.addFont('DejaVuSans-Bold-normal.ttf', 'DejaVuSans', 'Bold');
    doc.addFileToVFS('DejaVuSans-normal.ttf', CustomFonts.dejaVuSansNormal);
    doc.addFont('DejaVuSans-normal.ttf', 'DejaVuSans', 'normal');
    doc.autoTable({
      margin: { top: 30, bottom: 25},
      headStyles: { font: 'arial', halign: 'center', valign: 'middle', fillColor: [221, 240, 253],
                    textColor: [0, 0, 0], lineColor: [170, 170, 170], lineWidth: 0.08 },
      columnStyles: {
                      0: { cellWidth: 35, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      1: { halign: 'left', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      2: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      3: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      4: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      5: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      6: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      7: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      8: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      9: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      10: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      11: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      12: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                      13: { cellWidth: 12, halign: 'center', valign: 'middle', font: 'arial',
                          overflow: 'linebreak', lineColor: [170, 170, 170], lineWidth: 0.05 },
                    },
      head: [ [
                // tslint:disable-next-line: max-line-length
                { content: 'Numer', colSpan: 1, rowSpan: 2 },
                { content: 'Nazwa', colSpan: 1, rowSpan: 2},
                { content: 'Miesiące w roku ' + year, colSpan: 12, rowSpan: 1}
              ],
              [
                { content: 'I'},
                { content: 'II'},
                { content: 'III'},
                { content: 'IV'},
                { content: 'V'},
                { content: 'VI'},
                { content: 'VII'},
                { content: 'VIII'},
                { content: 'IX'},
                { content: 'X'},
                { content: 'XI'},
                { content: 'XII'}
              ],
            ],
      columns: [
              { header: 0, dataKey: 'nrString' },
              { header: 1, dataKey: 'nazwa' },
              { header: 2, dataKey: 'sprawdzeniaPlanoweSty' },
              { header: 3, dataKey: 'sprawdzeniaPlanoweLut' },
              { header: 4, dataKey: 'sprawdzeniaPlanoweMar' },
              { header: 5, dataKey: 'sprawdzeniaPlanoweKwi' },
              { header: 6, dataKey: 'sprawdzeniaPlanoweMaj' },
              { header: 7, dataKey: 'sprawdzeniaPlanoweCze' },
              { header: 8, dataKey: 'sprawdzeniaPlanoweLip' },
              { header: 9, dataKey: 'sprawdzeniaPlanoweSie' },
              { header: 10, dataKey: 'sprawdzeniaPlanoweWrz' },
              { header: 11, dataKey: 'sprawdzeniaPlanowePaz' },
              { header: 12, dataKey: 'sprawdzeniaPlanoweLis' },
              { header: 13, dataKey: 'sprawdzeniaPlanoweGru' },
            ],
      body: ins,
      didDrawPage: (data) => {
              doc.addImage(CustomFonts.logoZehnderPng, 'PNG', 14, 10, 23, 14);
              // console.log(doc.getFontList());
              doc.setFont('DejaVuSans', 'Bold');
              doc.setFontSize(12);
              doc.text('HARMONOGRAM KONTROLI NA ROK ' + year, 125, 25, { align: 'center'});
              doc.setFont('DejaVuSans', 'normal');
              doc.setFontSize(10);
              doc.text('Data wydruku: ' + new Date().toLocaleDateString() + 'r.', 283, 25, { align: 'right'});
              doc.setLineWidth(0.25);
              doc.line(14, 27, 283, 27);
              doc.line(14, 190, 283, 190);
      }
    });




    doc.save('Harmonogram_roczny_' + year + '.pdf');
  }
}
