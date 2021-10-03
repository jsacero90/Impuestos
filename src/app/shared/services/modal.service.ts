import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';

import { ModalFormReportsComponent } from '../../reports/components/modal-form-reports/modal-form-reports.component';
import { ModalFormParamsConceptsComponent } from '../../params-concepts/components/modal-form-params-concepts/modal-form-params-concepts.component';
import { ModalFormParamsTaxesComponent } from '../../params-taxes/components/modal-form-params-taxes/modal-form-params-taxes.component';
import { ParamsOfficeFormComponent } from '../../params-office/components/params-office-form/params-office-form.component';

import { ModalClass } from '../models/modal.model';
import { ParamsCompensationDaysFormComponent } from 'src/app/params-compensation-days/components/params-compensation-days-form/params-compensation-days-form.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  public modalComponet(modalName: string, modal: Modal, data?: any) {
    switch (modalName) {
      case 'ModalFormReportsComponent':
        return new ModalClass(ModalFormReportsComponent, modal, data);
      case 'ModalFormParamsTaxesComponent':
        return new ModalClass(ModalFormParamsTaxesComponent, modal, data);
      case 'ParamsCompensationDaysFormComponent':
        return new ModalClass(ParamsCompensationDaysFormComponent, modal, data);
      case 'ModalFormParamsConceptsComponent':
        return new ModalClass(ModalFormParamsConceptsComponent, modal, data);
      default:
        return new ModalClass(ParamsOfficeFormComponent, modal, data);
    }
  }
}
