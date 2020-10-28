import { AreaFull } from './../../_models/area';
import { StateService } from './../../_services/state.service';
import { AreaService, GroupService, PlaceService } from 'src/app/_services';
import { InstrumentFull } from 'src/app/_models';
import { State } from './../../_models/state';
import { PlaceFull } from './../../_models/place';
import { GroupInstrument } from 'src/app/assistant/interfaces';
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
  selectedGroupId = 0;
  listArea: AreaFull[];
  selectedAreaId = 0;
  selectedAreaName = '';
  listState: State[];
  selectedStateId = 3;
  isSample = false;

  constructor(public dialogRef: MatDialogRef<InstrumentFull>,
              @Inject(MAT_DIALOG_DATA) public data: InstrumentFull,
              private groupService: GroupService,
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
      this.isSample = this.data.wzorzec;
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
      grupa: new FormControl(this.selectedGroupId),
      // lokalizacja: new FormControl(this.data.idLokalizacja.id),
      lokalizacja: new FormControl(this.selectedAreaId),
      aktStatus: new FormControl(this.selectedStateId),
      wzorzec: new FormControl(this.isSample)
    }, );
    console.log(this.selectedStateId);
  }
  get nazwa() { return this.instrumentForm.get('nazwa'); }
  get typ() { return this.instrumentForm.get('typ'); }
  get grupa() { return this.instrumentForm.get('grupa'); }
  get lokalizacja() { return this.instrumentForm.get('lokalizacja'); }
  get aktStatus() { return this.instrumentForm.get('aktStatus'); }
  get wzorzec() { return this.instrumentForm.get('wzorzec'); }

  onSubmit(){

  }

  onNoClick(){
    this.dialogRef.close();
  }

  onChangeSelect(): void {
    this.listArea.forEach(element => {
      if (element.lokalizacja.length){
        element.lokalizacja.forEach(lok => {
          if (lok.id === this.selectedAreaId){
            this.selectedAreaName = element.nazwa + ': ' + lok.nazwa;
          }
        });
      }
    });
  }
}
