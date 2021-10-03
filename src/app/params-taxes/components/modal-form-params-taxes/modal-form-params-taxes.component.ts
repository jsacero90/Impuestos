import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

import { AlertsService } from '../../../shared/services/alerts.service';
import { ParamsTaxesService } from '../../services/params-taxes.service';

import { Store } from '@ngrx/store';
import { ParamsTaxesClass } from '../../models/params-taxes.model';
import { AppStateWithTaxesList } from '../../ngrx/params-taxes.reducer';
import * as taxesActions from '../../ngrx/params-taxes.actions';
import * as actionsNotifications from '../../../shared/ngrx/notifications/notifications.actions';

@Component({
  selector: 'app-modal-form-params-taxes',
  templateUrl: './modal-form-params-taxes.component.html',
  styleUrls: ['./modal-form-params-taxes.component.scss'],
})
export class ModalFormParamsTaxesComponent implements OnInit {
  public _data!: ParamsTaxesClass;

  get data(): ParamsTaxesClass {
    return this._data;
  }

  @Input()
  set data(value: ParamsTaxesClass) {
    this.dataModal = value;
    if (value) {
      this.updateFrom(value);
    }
  }

  @Input() modal!: Modal;
  dataModal!: any;
  forma!: FormGroup;

  @ViewChild('iconToggle') iconToggle!: ElementRef<HTMLElement>;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private store: Store<AppStateWithTaxesList>,
    private paramsTaxesService: ParamsTaxesService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      taxesCategory: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
      taxesTypeCode: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
      taxesTypeName: ['', [Validators.required]],
      operationCode: ['', [Validators.required]],
      accountantCode: ['', [Validators.required]],
      stateTaxeType: [false],
    });
  }

  updateFrom({
    tax,
    taxTypeCode,
    description,
    account,
    taxTypeStatus,
    operationCode,
  }: ParamsTaxesClass) {
    const stateTaxeType = taxTypeStatus === 0 ? false : true;
    this.forma.reset({
      taxesCategory: { value: tax.name, disabled: true },
      taxesTypeCode: { value: taxTypeCode, disabled: true },
      taxesTypeName: description,
      operationCode: { value: operationCode, disabled: true },
      accountantCode: { value: account, disabled: true },
      stateTaxeType,
    });
  }

  async send() {
    if (!(await this.alertsService.modalAccept())) {
      return;
    }

    const taxTypeStatus =
      this.forma.get('stateTaxeType')?.value === false ? 0 : 1;
    const body = {
      tax: {
        code: this.dataModal.tax.code,
      },
      taxTypeCode: this.forma.get('taxesTypeCode')?.value,
      description: this.forma.get('taxesTypeName')?.value.toUpperCase(),
      taxTypeStatus,
    };

    this.alertsService.createLoading();
    this.updateTaxes(body);
  }

  checkInput(e: any) {
    if (e.target.checked === true) {
      this.iconToggle.nativeElement.classList.remove('icon-error-red');
      return this.iconToggle.nativeElement.classList.add('icon-check-green');
    } else {
      this.iconToggle.nativeElement.classList.remove('icon-check-green');
      return this.iconToggle.nativeElement.classList.add('icon-error-red');
    }
  }

  updateTaxes(body: any) {
    this.paramsTaxesService.updateTaxes(body).subscribe(() => {
      this.alertsService.closeSwal();
      this.store.dispatch(taxesActions.resetParamsTaxes());
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
