import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

import { Store } from '@ngrx/store';
import { AppStateWithConceptsList } from '../../ngrx/params-concepts.reducer';
import * as conceptActions from '../../ngrx/params-concepts.actions';
import * as actionsNotifications from '../../../shared/ngrx/notifications/notifications.actions';

import { AlertsService } from '../../../shared/services/alerts.service';
import { ParamsConceptsService } from '../../services/params-concepts.service';

import { ParamsConceptsDataClass } from '../../models/params-concepts.model';

@Component({
  selector: 'app-modal-form-params-concepts',
  templateUrl: './modal-form-params-concepts.component.html',
  styleUrls: ['./modal-form-params-concepts.component.scss'],
})
export class ModalFormParamsConceptsComponent implements OnInit {
  public _data!: ParamsConceptsDataClass;

  get data(): ParamsConceptsDataClass {
    return this._data;
  }

  @Input()
  set data(value: ParamsConceptsDataClass) {
    this.dataModal = value;
    console.log(value);
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
    private store: Store<AppStateWithConceptsList>,
    private paramsConceptsService: ParamsConceptsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      conceptCode: ['', [Validators.required]],
      conceptName: ['', [Validators.required]],
      status: { value: true, disabled: true },
    });
  }

  updateFrom({ conceptCode, conceptName, status }: ParamsConceptsDataClass) {
    const state = status === 0 ? false : true;
    this.forma.reset({
      conceptCode: { value: conceptCode, disabled: true },
      conceptName,
      status: { value: state, disabled: false },
    });
  }

  async send() {
    if (!(await this.alertsService.modalAccept())) {
      return;
    }

    const status = this.forma.get('status')?.value === false ? 0 : 1;
    const body = {
      conceptCode: parseInt(this.forma.get('conceptCode')?.value),
      conceptName: this.forma.get('conceptName')?.value.toUpperCase(),
      status,
    };

    this.alertsService.createLoading();
    this.updateTaxes(body);
  }

  updateTaxes(body: any) {
    this.paramsConceptsService.updateConcept(body).subscribe(() => {
      this.alertsService.closeSwal();
      this.store.dispatch(conceptActions.resetParamsConcepts());
      this.store.dispatch(actionsNotifications.reset());
      this.store.dispatch(
        actionsNotifications.create({ idNotification: 's3' })
      );
      this.closeModal();
    });
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

  closeModal() {
    this.forma.reset();
    this.modal.hide();
  }
}
