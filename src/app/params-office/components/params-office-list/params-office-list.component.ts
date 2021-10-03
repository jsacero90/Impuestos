import { AlertsService } from './../../../shared/services/alerts.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';
import { ModalService } from '../../../shared/services/modal.service';
import { ModalClass } from '../../../shared/models/modal.model';

import { Store } from '@ngrx/store';

import { AppStateWithOfficeList } from '../../ngrx/params-office.reducer';
import { ParamsOfficeClass } from '../../models/params-office.model';
import { ParamsOfficesService } from '../../services/params-offices.service';

@Component({
  selector: 'app-params-office-list',
  templateUrl: './params-office-list.component.html',
  styleUrls: ['./params-office-list.component.scss'],
})
export class ParamsOfficeListComponent implements OnInit, OnDestroy {
  officeList: ParamsOfficeClass[] = [];
  subscription!: Subscription;
  title = 'modal';

  pageOfItems: any[] = [];

  componetModal!: ModalClass;

  @ViewChildren('iconToggle') iconToggles!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private store: Store<AppStateWithOfficeList>,
    private paramsOfficesService: ParamsOfficesService,
    private alertsService: AlertsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.store
      .select('paramsOffice')
      .subscribe((officeList) => (this.officeList = officeList));
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  onChangePage(pageOfItems: any[]) {
    this.pageOfItems = pageOfItems;
  }

  open() {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'FormComponent',
      modalB,
      {}
    );
    modalB.show();
  }

  openEdit(item: ParamsOfficeClass) {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'FormComponent',
      modalB,
      item
    );
    modalB.show();
  }

  async checkInput(e: any, id: string, currentOfficeCode: number) {
    if (e.target.checked === false) {
      if (await this.validationDeleteToggle(e)) {
        this.deleteOffice(e, id, currentOfficeCode);
        return;
      }
    } else {
      this.deleteOffice(e, id, currentOfficeCode);
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

  deleteOffice(e: any, id: string, currentOfficeCode: number) {
    this.alertsService.createLoading();
    console.log(currentOfficeCode);
    const officeStatus: number = e.target.checked ? 1 : 0;
    this.paramsOfficesService
      .deleteOficce({ currentOfficeCode, officeStatus })
      .subscribe(() => {
        this.changeClassI(e, id);
        this.alertsService.closeSwal();
      });
  }
}
