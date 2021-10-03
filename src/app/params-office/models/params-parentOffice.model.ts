export interface ParamParentOffice {
  status: Status;
  data: DataParamParentOffice[];
  base64Encoded: boolean;
}

export interface DataParamParentOffice {
  officeCode: number;
  officeName: string;
  costCenter: number;
  establishmentCode: string;
  parentOffice: number;
  officeStatus: number;
}

export interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}
