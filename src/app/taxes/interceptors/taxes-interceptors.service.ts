import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaxesInterceptorsService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //#TODO definicion de headers

    const headers = new HttpHeaders({
      //'token-usuario': '',
    });

    //#TODO clonar la request
    const reqClone = req.clone({
      //headers,
    });
    return next.handle(reqClone).pipe(catchError(this.handlerError));
  }
  //#TODO manejador de errores
  handlerError(error: HttpErrorResponse) {
    console.warn(error);
    return throwError(error);
  }
}
