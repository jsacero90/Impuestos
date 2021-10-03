export interface ParamsCityOffice {
  status: Status;
  data: ParamsCityOfficeData[];
  base64Encoded: boolean;
}

export interface ParamsCityOfficeData {
  cityId: number;
  departamentId: number;
  daneCode: string;
  cityName: string;
  status: string;
  cityBankRepublic: string;
}

export interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}
