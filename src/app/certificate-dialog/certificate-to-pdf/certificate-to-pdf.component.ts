import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-certificate-to-pdf',
  templateUrl: './certificate-to-pdf.component.html',
  styleUrls: ['./certificate-to-pdf.component.css']
})
export class CertificateToPdfComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  USERS = [
    {
      "id": 1,
      'name': 'Leanne Graham',
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  constructor() { }

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

    doc.text('Hello world!', 1, 1);
    doc.save('two-by-four.pdf');
  }

  public downloadPDF(): void {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');

    const handleElement = {
      '#editor'(element, renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 15, 15, {
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }
}
