import { AreaFull, GroupInstrument, InstrumentFull, PlaceFull, State } from './../../_models';
import { AreaService, GroupService, PlaceService, InstrumentService, StateService } from 'src/app/_services';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-addinstrument',
  templateUrl: './add-instrument.component.html',
  styleUrls: ['./add-instrument.component.css']
})
export class AddinstrumentComponent implements OnInit {

  instrumentForm: FormGroup;
  listGroup: GroupInstrument[];
  selectedGroupId = -1;
  listArea: AreaFull[];
  selectedAreaId = 0;
  selectedAreaName = '';
  listState: State[];
  selectedStateId = 0;
  isSample = false;
  currentNrList: any[];
  currentNrListOk = false;
  nrProposed = 1;
  nrProposedOk = false;

  constructor(public dialogRef: MatDialogRef<InstrumentFull>,
              @Inject(MAT_DIALOG_DATA) public data: InstrumentFull,
              private groupService: GroupService,
              private instrumentService: InstrumentService,
              private areaService: AreaService,
              private datePipe: DatePipe,
              private stateService: StateService) {}

  ngOnInit(){
    if (this.data.id){
      this.dialogRef.updateSize('630px', '700px');
      this.dialogRef.updatePosition({top: '50px'});
    }else{
      this.dialogRef.updateSize('630px', '770px');
      this.dialogRef.updatePosition({top: '50px'});
    }

    if (this.data.id !== 0){
      if (this.data.idLokalizacja){
        this.selectedAreaId = this.data.idLokalizacja.id;
      }
      if (this.data.idGrupa){
        this.selectedGroupId = this.data.idGrupa.id;
      }
      if (this.data.aktStatus){
        this.selectedStateId = this.data.aktStatus.id;
      }
      if (this.data.wzorzec){
        this.isSample = this.data.wzorzec;
      }
    }
    // console.log('data.nr: ' + this.data.nr);
    //
    this.instrumentService.getAllNr().subscribe( data => {
      this.currentNrList = data;
      this.currentNrListOk = true;
      console.log('data: ');
      console.log(this.data);
      console.log('currentNrList: ');
      console.log(this.currentNrList);
      this.findProposedNumber(data);
    });
    this.groupService.getList().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.listGroup = sorted;
    });
    this.areaService.getAll().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.listArea = sorted;
      if (this.selectedAreaId !== 0){
        this.onChangeSelect();
      }
    });
    this.stateService.getAll().subscribe( data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.listState = sorted;
    });
    this.currentNrListOk = false;
    this.instrumentForm = new FormGroup({
      nazwa: new FormControl(this.data.nazwa, [
        Validators.required,
        Validators.minLength(3)
      ]),
      typ: new FormControl(this.data.typ),
      grupa: new FormControl(this.selectedGroupId, [
        Validators.required,
        Validators.min(0)
      ]),
      lokalizacja: new FormControl(this.selectedAreaId),
      nrFabryczny: new FormControl(this.data.nrFabryczny ? this.data.nrFabryczny : ''),
      zakres: new FormControl(this.data.zakres ? this.data.zakres : ''),
      aktStatus: new FormControl(this.selectedStateId),
      wzorzec: new FormControl(this.isSample),
      data_sprawdzenia: new FormControl(null),
      data_nast_kontroli: new FormControl(null),
      nrhidden: new FormControl(0),
      nr: new FormControl(this.data.nr ? this.data.nr : this.nrProposed, [
        Validators.required
      ])
    }, );
    console.log(this.selectedStateId);
    this.setValidators();
  }
  setValidators(){
    if (!this.data.id){
      this.data_sprawdzenia.setValidators([Validators.required]);
      this.data_nast_kontroli.setValidators([Validators.required]);
    }else{
      this.data_sprawdzenia.setValidators(null);
      this.data_nast_kontroli.setValidators(null);
    }
    this.data_sprawdzenia.updateValueAndValidity();
    this.data_nast_kontroli.updateValueAndValidity();
  }

  get nazwa() { return this.instrumentForm.get('nazwa'); }
  get typ() { return this.instrumentForm.get('typ'); }
  get nrFabryczny() { return this.instrumentForm.get('nrFabryczny'); }
  get zakres() { return this.instrumentForm.get('zakres'); }
  get grupa() { return this.instrumentForm.get('grupa'); }
  get lokalizacja() { return this.instrumentForm.get('lokalizacja'); }
  get aktStatus() { return this.instrumentForm.get('aktStatus'); }
  get wzorzec() { return this.instrumentForm.get('wzorzec'); }
  get nr() { return this.instrumentForm.get('nr'); }
  get data_sprawdzenia() { return this.instrumentForm.get('data_sprawdzenia'); }
  get data_nast_kontroli() { return this.instrumentForm.get('data_nast_kontroli'); }

  findProposedNumber(data: any){
    // console.log('Sprawdzam: ' + this.nrProposed);
    if (data.find(d => d.nr === this.nrProposed)){
      this.nrProposed++;
      // console.log('Zwiększam o 1 : ' + this.nrProposed);
      this.findProposedNumber(data);
    }else{
      if (!this.data.nr){
        this.nr.setValue(this.nrProposed.toString());
      }
    }
  }
  checkProposedNr(){
    if (this.currentNrListOk){
      if (this.currentNrList.find(d => d.nr === this.nr.value) && this.data.nr !== this.nr.value){
        this.instrumentForm.get('nr').setErrors({existInDatabase: true});
        this.nrProposedOk = false;
        console.log('sprawdzamNOK' + this.nr.value);
      }else{
        this.nrProposedOk = true;
        console.log('sprawdzamOK' + this.nr.value);
      }
    }
  }


  onSubmit(){
    const instrumentFormData = new FormData();
    instrumentFormData.append('nazwa', this.instrumentForm.value.nazwa);
    instrumentFormData.append('typ', this.instrumentForm.value.typ);
    instrumentFormData.append('nrFabryczny', this.instrumentForm.value.nrFabryczny);
    instrumentFormData.append('zakres', this.instrumentForm.value.zakres);
    instrumentFormData.append('idGrupa', this.instrumentForm.value.grupa);
    instrumentFormData.append('idLokalizacja', this.instrumentForm.value.lokalizacja);
    instrumentFormData.append('aktStatus', this.instrumentForm.value.aktStatus);
    instrumentFormData.append('wzorzec', this.instrumentForm.value.wzorzec);
    instrumentFormData.append('nr', this.instrumentForm.value.nr);
    if (!this.data.id){
      instrumentFormData.append('dataOstatniejKontroli', this.datePipe.transform(this.data_sprawdzenia.value, 'yyyy-MM-dd'));
      instrumentFormData.append('dataNastepnejKontroli', this.datePipe.transform(this.data_nast_kontroli.value, 'yyyy-MM-dd'));
      instrumentFormData.append('nrAktualnegoSwiadectwa', '--brak--');
    }

    instrumentFormData.forEach((value, key) => {
      console.log(key + ': ' + value);
       });

    if (this.data && this.data.id) {
      this.instrumentService.edit(this.data.id, instrumentFormData).subscribe(
        (res: InstrumentFull) => {
          console.log(res);
          this.dialogRef.close();
        }
      );
    }
    else {
      this.instrumentService.add(instrumentFormData).subscribe(
        (res: InstrumentFull) => {
          console.log(res);
          this.dialogRef.close();
        }
      );
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onChangeSelect(): void {
    // console.log('sel: ' + this.instrumentForm.value.lokalizacja);
    this.listArea.forEach(element => {
      if (element.lokalizacja.length){
        element.lokalizacja.forEach(lok => {
          if (lok.id === this.instrumentForm.value.lokalizacja){
            this.selectedAreaName = element.nazwa + ': ' + lok.nazwa;
          }
        });
      }
    });
  }
}
