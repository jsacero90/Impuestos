import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ParamsConcepts } from '../models/params-concepts.model';

@Injectable({
  providedIn: 'root',
})
export class ParamsConceptsService {
  private apiUrl!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  private query(
    typeVerb = 0,
    header?: any,
    body?: any
  ): Observable<ParamsConcepts> {
    const url = `${this.apiUrl}/concepto`;
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
  ): Observable<ParamsConcepts> {
    switch (typeVerb) {
      case 1:
        return this.http.post<ParamsConcepts>(url, body);
      case 2:
        return this.http.request<ParamsConcepts>('delete', url, { body });
      case 3:
        return this.http.patch<ParamsConcepts>(url, body);
      case 4:
        return this.http.put<ParamsConcepts>(url, body);
      default:
        return this.http.get<ParamsConcepts>(url, { headers });
    }
  }

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getConcepts(headers: any) {
    headers = { 'x-bocc-imp-parameters': this.convertStringHeader(headers) };
    return this.query(0, headers);
  }

  public deleteConcept(body: any) {
    return this.query(2, {}, body);
  }

  public updateConcept(body: any) {
    return this.query(4, {}, body);
  }
}
