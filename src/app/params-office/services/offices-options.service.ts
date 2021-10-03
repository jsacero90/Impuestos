import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ParamsCityOffice,
  ParamsCityOfficeData,
} from '../models/params-city-office.model';
import { ParamsOffice } from '../models/params-office.model';
import { ParamParentOffice } from '../models/params-parentOffice.model';

@Injectable({
  providedIn: 'root',
})
export class OfficesOptionsService {
  private apiUrl!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<ParamsOffice> {
    const url = `${this.apiUrl}/region`;
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
      default:
        return this.http.get<ParamsOffice>(url, { headers });
    }
  }

  public getRegion() {
    return this.query();
  }

  public getCity() {
    return this.http.get<ParamsCityOffice>(`${this.apiUrl}/city`);
  }

  public getOfficeParent() {
    return this.http.get<ParamParentOffice>(`${this.apiUrl}/parentOffice`);
  }
}
