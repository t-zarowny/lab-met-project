import { Injectable, OnInit } from '@angular/core';
import { GroupInstrument} from '../_models';
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
export class DbService {

  menu = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              private auth: AuthenticationService) {
    const md = new MenuData();
    this.menu = md.menu_list();
  }
}


