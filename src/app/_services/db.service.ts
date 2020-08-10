import { Injectable, OnInit } from '@angular/core';
import { GroupInstrument, Menu, MeasurementCardTemplate } from '../assistant/interfaces';
import { MenuData } from '../assistant/menu-data';
import { Subject, Observable, throwError } from 'rxjs';
import { isUndefined } from 'util';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, retry, tap } from 'rxjs/operators';
import { AuthenticationService } from '../login/_services';


@Injectable({
  providedIn: 'root'
})
export class DbService implements OnInit {

  SERVER_URL = 'http://127.0.0.1:8000/api/';
  uploadForm: FormGroup;


  // menuOb:Menu;
  menu = null;

  public groupInstrumentArray = new Array<GroupInstrument>();
  private groupInstrumentArrayObs = new Subject<GroupInstrument[]>();

  public measurementCardArray = new Array<MeasurementCardTemplate>();
  private measurementCardObs = new Subject<MeasurementCardTemplate[]>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              private auth: AuthenticationService) {
    const md = new MenuData();
    this.menu = md.menu_list();
    // console.log(this.menu);
  }

  addNewGroup(form: FormData){
    return this.http.post<any>(this.SERVER_URL + 'grupy/', form)
      .pipe(tap(console.log));
  }

  getListGroup(): Observable<GroupInstrument[]> {
    return this.http.get<GroupInstrument[]>(this.SERVER_URL + 'grupy/')
      .pipe(tap(data => JSON.stringify(data as GroupInstrument[])));
  }

  deleteGroup(id: number) {
    const url = `${this.SERVER_URL}grupy/${id}/`;
    return this.http.delete(url)
      .pipe(tap(console.log));
  }

  updateGroup(id: number, form: FormData){
    const url = `${this.SERVER_URL}grupy/${id}/`;
    return this.http.put<any>(url, form)
      .pipe(tap(console.log));
  }

  addNewMeasurementCard(c: MeasurementCardTemplate) {
    if (c.id === undefined) {
      const cn: MeasurementCardTemplate = {
        id: this.groupInstrumentArray.length,
        documentNo: c.documentNo,
        title: c.title,
        template: c.template
      };
      this.measurementCardArray.push(cn);
    } else {
      const index = this.measurementCardArray.findIndex
        (
          x => x.id === c.id
        );
      index !== -1 ? this.measurementCardArray.splice(index, 1, c) : this.measurementCardArray.push(c);
    }
    this.measurementCardObs.next(this.measurementCardArray);
  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() { }

  getListMeasurementCard(): Observable<MeasurementCardTemplate[]> {
    return this.measurementCardObs.asObservable();
  }

}


