import { Type } from '@angular/core';
import { Modal } from 'bootstrap';

export class ModalClass {
  public componentModal!: Type<any>;
  public modal!: Modal;
  public data?: any;

  constructor(componentModal: Type<any>, modal: Modal, data?: any) {
    this.componentModal = componentModal;
    this.modal = modal;
    this.data = data;
  }
}

export interface DataModal {
  data: any;
}

export interface ModalComponet {
  modal: Modal;
}
