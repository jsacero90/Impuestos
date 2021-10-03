import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryTaxes } from '../models/category-taxes.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryTaxesService {
  private apiUrl!: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<CategoryTaxes> {
    const url = `${this.apiUrl}/report-service-tax`;
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
  ): Observable<CategoryTaxes> {
    switch (typeVerb) {
      case 1:
        return this.http.post<CategoryTaxes>(url, body);
      case 2:
        return this.http.request<CategoryTaxes>('delete', url, {
          body,
        });
      default:
        return this.http.get<CategoryTaxes>(url, { headers });
    }
  }

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getCategoryTaxes(headers: any) {
    headers = { 'x-bocc-imp-parameters': this.convertStringHeader(headers) };
    return this.query(0, headers);
  }
}
