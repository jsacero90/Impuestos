import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateWithTaxe } from '../../ngrx/taxes.reducer';

import * as actionsNotifications from '../../../shared/ngrx/notifications/notifications.actions';

import { TaxesService } from '../../services/taxes.service';
import { AlertsService } from '../../../shared/services/alerts.service';

import { Tax, TaxesDataModel } from '../../models/taxes.model';
import { TaxesFile } from '../../models/taxes-file.model';
import { DownloadFilesService } from '../../../shared/services/download-files.service';

@Component({
  selector: 'app-taxes-detail',
  templateUrl: './taxes-detail.component.html',
  styleUrls: ['./taxes-detail.component.scss'],
})
export class TaxesDetailComponent implements OnInit {
  taxesData!: TaxesDataModel;
  taxDates!: Tax[];

  constructor(
    private store: Store<AppStateWithTaxe>,
    private taxesService: TaxesService,
    private alertsService: AlertsService,
    private downloadFilesService: DownloadFilesService
  ) {}

  ngOnInit(): void {
    this.store.select('taxes').subscribe((data) => {
      this.taxesData = data;
      this.taxDates = this.taxesData.taxes;
      console.log(this.taxDates);
    });
  }

  dowloadFile() {
    this.alertsService.createLoading();
    const date = this.taxDates[0].taxCategories[0].dateReport;
    this.taxesService
      .getFileTaxe(date, date)
      .subscribe(({ fileName, fileContent }: TaxesFile) => {
        this.downloadFilesService
          .createFile(fileContent, fileName, 'text/pain')
          // TODO: poner alerta
          .then(() => {
            this.alertsService.closeSwal();
            this.store.dispatch(actionsNotifications.reset());
            this.store.dispatch(
              actionsNotifications.create({ idNotification: 's1' })
            );
          })
          .catch(() => {
            this.alertsService.closeSwal();
            this.store.dispatch(actionsNotifications.reset());
            this.store.dispatch(
              actionsNotifications.create({ idNotification: 'e1' })
            );
          });
      });
  }
}
