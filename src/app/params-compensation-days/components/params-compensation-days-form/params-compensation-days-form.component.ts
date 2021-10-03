import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { AppStateWithCompensationList } from '../../ngrx/params-compensation-days.reducer';
import { ParamsCompensationDaysService } from '../../services/params-compensation-days.service';
import { Store } from '@ngrx/store';
import { ParamsCompensationDaysClass } from '../../models/params-compensation-days.model';
import { Modal } from 'bootstrap';
import * as compensatoryActions from '../../ngrx/params-compensation-days.actions';
import * as actionsNotifications from '../../../shared/ngrx/notifications/notifications.actions';

@Component({
  selector: 'app-params-compensation-days-form',
  templateUrl: './params-compensation-days-form.component.html',
  styleUrls: ['./params-compensation-days-form.component.scss'],
})
export class ParamsCompensationDaysFormComponent implements OnInit {
  public _data!: ParamsCompensationDaysClass;

  get data(): ParamsCompensationDaysClass {
    return this._data;
  }

  @Input()
  set data(value: ParamsCompensationDaysClass) {
    this.dataModal = value;
    console.log(this.dataModal);
    if (value) {
      this.updateFrom(value);
    }
  }

  @Input() modal!: Modal;
  dataModal!: any;
  forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private paramsCompensationDaysService: ParamsCompensationDaysService,
    private store: Store<AppStateWithCompensationList>
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      year: { value: '', disabled: true },
      month: { value: '', disabled: true },
      taxName: { value: '', disabled: true },
      compensatoryDays: ['', [Validators.required]],
    });
  }

  updateFrom({
    year,
    month,
    compensatoryDays,
    taxName,
    status,
    compensatoryId,
  }: ParamsCompensationDaysClass) {
    this.forma.reset({
      year: { value: year, disabled: true },
      month: { value: month, disabled: true },
      taxName: { value: taxName, disabled: true },
      compensatoryDays: compensatoryDays,
      status,
      compensatoryId,
    });
  }

  async send() {
    if (!(await this.alertsService.modalAccept())) {
      return;
    }

    const body = {
      compensatoryId: this.dataModal.compensatoryId,
      compensatoryDays: this.forma.get('compensatoryDays')?.value,
      status: this.dataModal.status,
    };

    this.alertsService.createLoading();
    console.log(body);
    this.updateCompensatory(body);
  }

  updateCompensatory(body: any) {
    this.paramsCompensationDaysService
      .updateCompensatory(body)
      .subscribe(() => {
        this.alertsService.closeSwal();
        this.store.dispatch(compensatoryActions.resetParamsCompensationDays());
        this.store.dispatch(actionsNotifications.reset());
        this.store.dispatch(
          actionsNotifications.create({ idNotification: 's2' })
        );
        this.closeModal();
      });
  }

  closeModal() {
    this.forma.reset();
    this.modal.hide();
  }
}
