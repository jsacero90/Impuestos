export interface ParamsOffice {
  status: Status;
  data: DataParamsOffice[];
  base64Encoded: boolean;
}

export interface DataParamsOffice {
  officeCode: number;
  officeName: string;
  costCenter: number;
  establishmentCode: string;
  currentOfficeCode: number;
  parentOffice: number;
  officeStatus: number;
  regionCodeId: number;
  cityCodeId: number;
  taxList: TaxList[];
  adminCode: AdminCode;
  region: Region;
  city: City;
}

export interface City {
  cityId: number;
  departamentId: number;
  daneCode: string;
  cityName: string;
  status: string;
  cityBankRepublic: string;
}

export interface Region {
  regionId: number;
  regionCode: string;
  regionDescription: string;
  regionstatus: string;
}

export interface AdminCode {
  adminCode: number;
  adminName: string;
  taxType: number;
}

export interface TaxList {
  code: number;
  name: string;
}

export interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}

export class ParamsOfficeClass {
  public officeCode: number;
  public officeName: string;
  public costCenter: number;
  public establishmentCode: string;
  public currentOfficeCode: number;
  public parentOffice: number;
  public officeStatus: number;
  public regionCodeId: number;
  public cityCodeId: number;
  public taxList: TaxList[];
  public adminCode: AdminCode;
  public region: Region;
  public city: City;

  constructor({
    officeCode,
    officeName,
    costCenter,
    establishmentCode,
    currentOfficeCode,
    parentOffice,
    officeStatus,
    regionCodeId,
    cityCodeId,
    taxList,
    adminCode,
    region,
    city,
  }: DataParamsOffice) {
    this.officeCode = officeCode;
    this.officeName = officeName;
    this.costCenter = costCenter;
    this.establishmentCode = establishmentCode;
    this.currentOfficeCode = currentOfficeCode;
    this.parentOffice = parentOffice;
    this.officeStatus = officeStatus;
    this.regionCodeId = regionCodeId;
    this.cityCodeId = cityCodeId;
    this.taxList = taxList;
    this.adminCode = adminCode;
    this.region = region;
    this.city = city;
  }
}
