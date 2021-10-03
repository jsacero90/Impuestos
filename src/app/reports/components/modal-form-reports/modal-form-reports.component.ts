import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actionsNotifications from '../../../shared/ngrx/notifications/notifications.actions';

import { AlertsService } from '../../../shared/services/alerts.service';
import { DownloadFilesService } from '../../../shared/services/download-files.service';
import { ReportsService } from './../../services/reports.service';

import { FileReportsOfficeData } from '../../models/reports-office';

@Component({
  selector: 'app-modal-form-reports',
  templateUrl: './modal-form-reports.component.html',
  styleUrls: ['./modal-form-reports.component.scss'],
})
export class ModalFormReportsComponent implements OnInit {
  @Input() modal!: Modal;
  forma!: FormGroup;
  dateNow = new Date(Date.now());
  dateYesterday!: string;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private store: Store<AppState>,
    private reportsService: ReportsService,
    private downloadFilesService: DownloadFilesService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  generateDateYesterday() {
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
      this.dateNow
    );
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(
      this.dateNow
    );
    const day =
      parseInt(
        new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.dateNow)
      ) - 1;
    return `${year}-${month}-${day}`;
  }

  createForm() {
    this.forma = this.fb.group({
      dateInput: [this.generateDateYesterday(), [Validators.required]],
      consecutiveInput: ['', [Validators.required, Validators.maxLength(6)]],
      typeFile: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
    });
  }

  get dateInputInValid() {
    return (
      this.forma.get('dateInput')?.invalid &&
      this.forma.get('dateInput')?.touched
    );
  }

  get dateInputValid() {
    return (
      this.forma.get('dateInput')?.valid && this.forma.get('dateInput')?.touched
    );
  }

  get consecutiveInputInValid() {
    return (
      this.forma.get('consecutiveInput')?.invalid &&
      this.forma.get('consecutiveInput')?.touched
    );
  }

  get consecutiveInputFileValid() {
    return (
      this.forma.get('consecutiveInput')?.valid &&
      this.forma.get('consecutiveInput')?.touched
    );
  }

  get typeFileInValid() {
    return (
      this.forma.get('typeFile')?.invalid &&
      this.forma.get('typeFile')?.touched &&
      this.forma.get('typeFile')?.value === 'noSelect'
    );
  }

  get typeFileValid() {
    return (
      this.forma.get('typeFile')?.valid &&
      this.forma.get('typeFile')?.touched &&
      this.forma.get('typeFile')?.value !== 'noSelect'
    );
  }

  dowloadFile() {
    this.alertsService.createLoading();
    let date = this.forma.get('dateInput')?.value.split('-');
    date = date[0] + date[1] + date[2];

    const headers = {
      date,
      sequence: this.forma.get('consecutiveInput')?.value,
      reportType: this.forma.get('typeFile')?.value,
    };

    this.reportsService.getFileReportsOffice(headers).subscribe(({ data }) => {
      this.getFileReportsOffice(data);
    });
  }

  getFileReportsOffice({ fileContent, fileName }: FileReportsOfficeData) {
    this.downloadFilesService
      .createFile(fileContent, fileName, 'text/pain')
      // TODO: poner alerta
      .then(() => {
        this.alertsService.closeSwal();
        this.store.dispatch(actionsNotifications.reset());
        this.store.dispatch(
          actionsNotifications.create({ idNotification: 's1' })
        );
        this.closeModal();
      })
      .catch(() => {
        this.alertsService.closeSwal();
        this.store.dispatch(actionsNotifications.reset());
        this.store.dispatch(
          actionsNotifications.create({ idNotification: 'e1' })
        );
      });
  }

  closeModal() {
    this.forma.reset();
    this.modal.hide();
  }
}
