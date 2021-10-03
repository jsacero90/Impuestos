import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

import { ModalClass } from '../../../shared/models/modal.model';
import { ModalService } from '../../../shared/services/modal.service';
import sections from '../../../../assets/json/panels/reports.json';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  textBody = `En esta sección podrás generar visualizar y generar reportes.`;
  section: any[] = sections;

  componetModal!: ModalClass;

  constructor(private route: Router, private modalService: ModalService) {}

  ngOnInit(): void {}

  target(ruta: string) {
    this.route.navigate([ruta]);
  }

  open() {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'ModalFormReportsComponent',
      modalB,
      {}
    );
    modalB.show();
  }
}
