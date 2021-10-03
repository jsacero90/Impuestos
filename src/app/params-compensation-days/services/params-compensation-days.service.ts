import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ParamsCompensationDays } from '../models/params-compensation-days.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParamsCompensationDaysService {
  private apiUrl!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<ParamsCompensationDays> {
    const url = `${this.apiUrl}/compensatory`;
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      ...header,
    });

    return this.typeVerbConsult(url, headers, typeVerb, body);
  }

  private typeVerbConsult(
    url: string,
    headers: HttpHeaders,
    typeVerb: number,
    body?: any
  ): Observable<ParamsCompensationDays> {
    switch (typeVerb) {
      case 1:
        return this.http.post<ParamsCompensationDays>(url, body);
      case 2:
        return this.http.request<ParamsCompensationDays>('delete', url, {
          body,
        });
      case 3:
        return this.http.put<ParamsCompensationDays>(url, body);
      default:
        return this.http.get<ParamsCompensationDays>(url, { headers });
    }
  }

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getCompensationDays(headers: any) {
    headers = { 'x-bocc-imp-parameters': this.convertStringHeader(headers) };
    return this.query(0, headers);
  }

  public updateCompensatory(body: any) {
    return this.query(3, {}, body);
  }
}
