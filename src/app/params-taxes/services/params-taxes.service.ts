import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ParamsTaxes } from '../models/params-taxes.model';

@Injectable({
  providedIn: 'root',
})
export class ParamsTaxesService {
  private apiUrl!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<ParamsTaxes> {
    const url = `${this.apiUrl}/report-service-tax-type`;
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
  ): Observable<ParamsTaxes> {
    switch (typeVerb) {
      case 1:
        return this.http.post<ParamsTaxes>(url, body);
      case 2:
        return this.http.request<ParamsTaxes>('delete', url, { body });
      case 3:
        return this.http.patch<ParamsTaxes>(url, body);
      default:
        return this.http.get<ParamsTaxes>(url, { headers });
    }
  }

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getTaxes(headers: any) {
    headers = { 'x-bocc-imp-parameters': this.convertStringHeader(headers) };
    return this.query(0, headers);
  }

  public deleteTaxes(body: any) {
    return this.query(2, {}, body);
  }

  public updateTaxes(body: any) {
    return this.query(3, {}, body);
  }
}
