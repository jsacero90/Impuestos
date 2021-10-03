export interface ParamsConcepts {
  status: Status;
  data: ParamsConceptsDataClass[];
  base64Encoded: boolean;
}

interface ParamsConceptsData {
  conceptCode: number;
  conceptName: string;
  status: number;
}

interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}

export class ParamsConceptsDataClass {
  public conceptCode!: number;
  public conceptName!: string;
  public currentCode!: number;
  public status!: number;

  constructor({ conceptCode, conceptName, status }: ParamsConceptsData) {
    this.conceptCode = conceptCode;
    this.conceptName = conceptName;
    this.status = status;
  }
}
