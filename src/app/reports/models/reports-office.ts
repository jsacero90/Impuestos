export interface FileReportsOffice {
  status: Status;
  data: FileReportsOfficeData;
  base64Encoded: boolean;
}

export interface FileReportsOfficeData {
  fileName: string;
  fileContent: string;
}

interface Status {
  statusCode: number;
  statusDescription: string;
  layerName: string;
}
