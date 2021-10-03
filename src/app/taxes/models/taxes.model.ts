export interface TaxesDataModel {
  taxes: Tax[];
}

export interface Tax {
  totalAmount: number;
  totalQuantity: number;
  totalSchedules: TotalSchedule[];
  taxCategories: TaxCategory[];
}

export interface TaxCategory {
  name: string;
  dateReport: string;
  totalSchedules: TotalSchedule[];
  totalAmount: number;
  totalQuantity: number;
  schedules: Schedule[];
}

export interface Schedule {
  code: string;
  type: string;
  totalAmount: number;
  totalQuantity: number;
  collections: Collection[];
}

export interface Collection {
  entity: string;
  totalAmount: number;
  totalQuantity: number;
  operations: Operation[];
}

export interface Operation {
  code: string;
  name: string;
  totalQuantity: number;
  totalAmount: number;
}

export interface TotalSchedule {
  code: string;
  type: string;
  totalAmount: number;
  totalQuantity: number;
}
