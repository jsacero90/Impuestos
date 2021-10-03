export interface ParamsTaxes {
  status: Status;
  data: ParamsTaxesData[];
  base64Encoded: boolean;
}

interface ParamsTaxesData {
  tax: Tax;
  taxTypeCode: string;
  description: string;
  operationCode: number;
  account: string;
  taxTypeStatus: number;
}

interface Tax {
  code: number;
  name: string;
  taxStatus: number;
}

interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}

export class ParamsTaxesClass {
  public tax!: Tax;
  public taxTypeCode!: string;
  public description!: string;
  public operationCode!: number;
  public account!: string;
  public taxTypeStatus!: number;

  constructor({
    tax,
    taxTypeCode,
    description,
    operationCode,
    account,
    taxTypeStatus,
  }: ParamsTaxesData) {
    this.tax = tax;
    this.taxTypeCode = taxTypeCode;
    this.description = description;
    this.operationCode = operationCode;
    this.account = account;
    this.taxTypeStatus = taxTypeStatus;
  }
}
