export interface ParamsCompensationDays {
  status: Status;
  data: ParamsCompensationDaysData[];
  base64Encoded: boolean;
}

export interface ParamsCompensationDaysData {
  compensatoryId?: number;
  year: number;
  month: number;
  taxCategory: number;
  compensatoryDays?: number;
  status?: number;
  taxName: string;
}

export interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}

export class ParamsCompensationDaysClass {
  public compensatoryId?: number;
  public year: number;
  public month: number;
  public taxCategory: number;
  public compensatoryDays?: number;
  public status?: number;
  public taxName: string;

  constructor({
    compensatoryId,
    year,
    month,
    taxCategory,
    compensatoryDays,
    status,
    taxName,
  }: ParamsCompensationDaysData) {
    this.compensatoryId = compensatoryId;
    this.year = year;
    this.month = month;
    this.taxCategory = taxCategory;
    this.compensatoryDays = compensatoryDays;
    this.status = status;
    this.taxName = taxName;
  }
}
