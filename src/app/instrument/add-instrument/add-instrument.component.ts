import { AreaFull, GroupInstrument, InstrumentFull, PlaceFull, State } from './../../_models';
import { AreaService, GroupService, PlaceService, InstrumentService, StateService } from 'src/app/_services';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  selectedStateId = 3;
  isSample = false;

  constructor(public dialogRef: MatDialogRef<InstrumentFull>,
              @Inject(MAT_DIALOG_DATA) public data: InstrumentFull,
              private groupService: GroupService,
              private instrumentService: InstrumentService,
              private areaService: AreaService,
              private stateService: StateService) { }

  ngOnInit(){
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
      nrFabryczny: new FormControl(this.data.nrFabryczny),
      zakres: new FormControl(this.data.zakres),
      aktStatus: new FormControl(this.selectedStateId),
      wzorzec: new FormControl(this.isSample)
    }, );
    console.log(this.selectedStateId);
  }
  get nazwa() { return this.instrumentForm.get('nazwa'); }
  get typ() { return this.instrumentForm.get('typ'); }
  get nrFabryczny() { return this.instrumentForm.get('nrFabryczny'); }
  get zakres() { return this.instrumentForm.get('zakres'); }
  get grupa() { return this.instrumentForm.get('grupa'); }
  get lokalizacja() { return this.instrumentForm.get('lokalizacja'); }
  get aktStatus() { return this.instrumentForm.get('aktStatus'); }
  get wzorzec() { return this.instrumentForm.get('wzorzec'); }

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
