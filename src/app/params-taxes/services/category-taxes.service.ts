import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  private convertStringHeader(header: any) {
    header = JSON.stringify(JSON.stringify(header));
    return header;
  }

  public getCategoryTaxes() {
    let header = this.convertStringHeader({ code: 0, taxStatus: 1 });
    let headers = new HttpHeaders({ 'x-bocc-imp-parameters': header });
    return this.http.get<CategoryTaxes>(`${this.apiUrl}/report-service-tax`, {
      headers,
    });
  }
}
