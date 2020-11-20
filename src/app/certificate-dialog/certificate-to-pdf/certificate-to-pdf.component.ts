import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-certificate-to-pdf',
  templateUrl: './certificate-to-pdf.component.html',
  styleUrls: ['./certificate-to-pdf.component.css']
})
export class CertificateToPdfComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {
  }

  createTest(){
    console.log('test pdf');

    // Landscape export, 2×4 inches
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [4, 2]
    });

    doc.text('Hello world!', 20, 20);
    doc.save('two-by-four.pdf');
  }
}
