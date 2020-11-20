import { Certificate } from 'src/app/_models';
import * as jsPDF from 'jspdf';
import { CertificateService } from '../_services';

export class CertificateToPdf{
  certificate: Certificate;

  constructor(){}

  public loadData(idCertificate: number){

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
  public downloadCertificatePDF(){


  }
}
