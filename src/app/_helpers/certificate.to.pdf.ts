import * as jsPDF from 'jspdf';

export class CertificateToPdf{

  constructor(idCertificate: number){
  }

  createTest(){
    console.log('test pdf');

    // Landscape export, 2×4 inches
    const doc = new jsPDF({
      orientation: 'portrait',
      format: 'a4',
      unit: 'mm'
    });

    doc.text('Hello world!', 1, 1);
    doc.save('two-by-four.pdf');
  }
}
