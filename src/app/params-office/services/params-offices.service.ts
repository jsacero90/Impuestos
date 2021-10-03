import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParamsOffice } from '../models/params-office.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParamsOfficesService {
  private apiUrl!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<ParamsOffice> {
    const url = `${this.apiUrl}/report-office`;
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
  ): Observable<ParamsOffice> {
    switch (typeVerb) {
      case 1:
        return this.http.post<ParamsOffice>(url, body);
      case 2:
        return this.http.request<ParamsOffice>('delete', url, { body });
      case 3:
        return this.http.put<ParamsOffice>(url, body);
      default:
        return this.http.get<ParamsOffice>(url, { headers });
    }
  }

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getOficces(headers: any) {
    headers = { 'x-bocc-imp-parameters': this.convertStringHeader(headers) };
    return this.query(0, headers);
  }

  public deleteOficce(body: any) {
    return this.query(2, {}, body);
  }

  public createOficce(body: any) {
    return this.query(1, {}, body);
  }

  public updateOficce(body: any) {
    return this.query(3, {}, body);
  }
}
