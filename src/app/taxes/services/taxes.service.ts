import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TaxesDataModel } from '../models/taxes.model';
import { TaxesFile } from '../models/taxes-file.model';

@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  private apiUrl: string;
  date!: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getAllDataParams(dateInitial = '', dateEnd = '') {
    this.date = `{"fechaInicio":"${dateInitial}","fechaFin":"${dateEnd}"}`;
    console.log(JSON.stringify(this.date));

    let headers = new HttpHeaders({
      'x-bocc-imp-parameters': JSON.stringify(this.date),
    });

    return this.http.get<TaxesDataModel>(`${this.apiUrl}/report`, {
      headers,
    });
  }

  getFileTaxe(dateInitial = '', dateEnd = '') {
    this.date = `{"fechaInicio":"${dateInitial}","fechaFin":"${dateEnd}"}`;
    console.log(JSON.stringify(this.date));

    let headers = new HttpHeaders({
      'x-bocc-imp-parameters': JSON.stringify(this.date),
    });

    return this.http.get<TaxesFile>(`${this.apiUrl}/report-file`, {
      headers,
    });
  }
}
