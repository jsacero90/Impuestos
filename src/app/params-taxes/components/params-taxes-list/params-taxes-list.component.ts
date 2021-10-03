import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Modal } from 'bootstrap';

import { AlertsService } from '../../../shared/services/alerts.service';
import { ParamsTaxesService } from '../../services/params-taxes.service';

import { ParamsTaxesClass } from '../../models/params-taxes.model';

import { Store } from '@ngrx/store';
import { AppStateWithTaxesList } from '../../ngrx/params-taxes.reducer';

import { ModalClass } from '../../../shared/models/modal.model';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-params-taxes-list',
  templateUrl: './params-taxes-list.component.html',
  styleUrls: ['./params-taxes-list.component.scss'],
})
export class ParamsTaxesListComponent implements OnInit {
  pageOfItems: any[] = [];
  taxesList: ParamsTaxesClass[] = [];
  componetModal!: ModalClass;

  @ViewChildren('iconToggle') iconToggles!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private alertsService: AlertsService,
    private store: Store<AppStateWithTaxesList>,
    private paramsTaxesService: ParamsTaxesService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.store.select('paramsTaxes').subscribe((taxesList) => {
      this.taxesList = taxesList;
    });
  }

  onChangePage(pageOfItems: any[]) {
    this.pageOfItems = pageOfItems;
  }

  async checkInput(e: any, id: string, taxTypeCode: string, taxCode: number) {
    if (e.target.checked === false) {
      if (await this.validationDeleteToggle(e)) {
        this.deleteTaxes(e, id, taxTypeCode, taxCode);
        return;
      }
    } else {
      this.deleteTaxes(e, id, taxTypeCode, taxCode);
    }
  }

  changeClassI(e: any, id: string) {
    this.iconToggles.forEach((iconToggle) => {
      if (iconToggle.nativeElement.id === id && e.target.checked === true) {
        iconToggle.nativeElement.classList.remove('icon-error-red');
        return iconToggle.nativeElement.classList.add('icon-check-green');
      }
      if (iconToggle.nativeElement.id === id && e.target.checked === false) {
        iconToggle.nativeElement.classList.remove('icon-check-green');
        return iconToggle.nativeElement.classList.add('icon-error-red');
      }
    });
  }

  async validationDeleteToggle(e: any) {
    try {
      return this.alertsService.modalAccept().then((status) => {
        if (status == false) {
          e.target.checked = true;
          return false;
        }
        return true;
      });
    } catch (error) {
      return 'Error validando';
    }
  }

  deleteTaxes(e: any, id: string, taxTypeCode: string, taxCode: number) {
    this.alertsService.createLoading();
    const taxesStatus: number = e.target.checked ? 1 : 0;
    const body = {
      tax: {
        code: taxCode,
      },
      taxTypeCode: taxTypeCode,
      taxTypeStatus: taxesStatus,
    };
    this.paramsTaxesService.deleteTaxes(body).subscribe(({ status }) => {
      if (status.statusDescription === 'Exitoso') {
        this.changeClassI(e, id);
        this.alertsService.closeSwal();
      }
    });
  }

  open() {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'ModalFormParamsTaxesComponent',
      modalB,
      ''
    );
    modalB.show();
  }

  openEdit(item: ParamsTaxesClass) {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'ModalFormParamsTaxesComponent',
      modalB,
      item
    );
    modalB.show();
  }
}
