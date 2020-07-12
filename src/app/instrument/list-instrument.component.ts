import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listinstrument',
  //templateUrl: './list-instrument.component.html',
  template: '<pdf-viewer id="viewer" [src]="pdfSrc"></pdf-viewer>',
  styleUrls: ['./list-instrument.component.css']
})
export class ListInstrumentComponent implements OnInit {
  pdfSrc = '../../assets/Test_formularza.pdf';
  constructor() { }

  ngOnInit() {
  }

}
