import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadFilesService {
  constructor() {}

  async createFile(dataBase64: string, fileName: string, typeFile: string) {
    try {
      const source = `data:${typeFile};base64,${dataBase64}`;
      const link = document.createElement('a');
      link.href = source;
      link.download = `${fileName}`;
      link.click();
    } catch (error) {
      throw Error('Error al generar el archivo');
    }
  }
}
