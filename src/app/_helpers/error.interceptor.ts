import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './../login/_services';

import { AuthenticationService } from '../login/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          catchError(errorResponse => {
            console.log(errorResponse);
            if (errorResponse.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            let errMsg: string;
            if (errorResponse instanceof HttpErrorResponse) {
              const err = JSON.stringify(errorResponse.error) || errorResponse.message;
              errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''}, Szczególy: ${err}`;
              // console.log('if');
              this.alertService.error(errMsg);
            } else {
              errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
              // console.log('else');
              this.alertService.error(errMsg);
            }
            console.log(errMsg);
            const error = errorResponse.error.message || errorResponse.statusText;
            return throwError(error);
        }));
    }
}
