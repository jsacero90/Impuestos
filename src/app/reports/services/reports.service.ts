import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FileReportsOffice } from '../models/reports-office';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<FileReportsOffice> {
    const url = `${this.apiUrl}/report-file-office-shd`;
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
  ): Observable<FileReportsOffice> {
    switch (typeVerb) {
      case 1:
        return this.http.post<FileReportsOffice>(url, body);
      default:
        return this.http.get<FileReportsOffice>(url, { headers });
    }
  }

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getFileReportsOffice(headers: any) {
    headers = { 'x-bocc-imp-parameters': this.convertStringHeader(headers) };
    return this.query(0, headers);
  }
}
