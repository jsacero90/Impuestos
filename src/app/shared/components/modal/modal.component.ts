import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalClass } from './../../models/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  private _componetModal!: ModalClass;

  get componetModal(): ModalClass {
    return this._componetModal;
  }

  @Input()
  set componetModal(value: ModalClass) {
    this._componetModal = value;
    if (value) {
      this.container.clear();
      this.loadComponent(value.componentModal, value.modal, value.data);
    }
  }

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  loadComponent(componentModal: Type<any>, modal: Modal, data?: any) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentModal);

    const componentRefModal =
      this.container.createComponent<any>(componentFactory);
    componentRefModal.instance.modal = modal;

    if (data) {
      componentRefModal.instance.data = data;
    }
  }
}
