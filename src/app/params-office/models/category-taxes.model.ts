export interface CategoryTaxes {
  status: Status;
  data: DataCategoryTaxes[];
  base64Encoded: boolean;
}

export interface DataCategoryTaxes {
  code: number;
  name: string;
  taxStatus: number;
}

interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}
