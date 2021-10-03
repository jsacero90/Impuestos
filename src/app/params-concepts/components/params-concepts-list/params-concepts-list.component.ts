import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Modal } from 'bootstrap';

import { Store } from '@ngrx/store';
import { AppStateWithConceptsList } from '../../ngrx/params-concepts.reducer';

import { AlertsService } from '../../../shared/services/alerts.service';
import { ParamsConceptsService } from '../../services/params-concepts.service';
import { ModalService } from '../../../shared/services/modal.service';

import { ParamsConceptsDataClass } from '../../models/params-concepts.model';
import { ModalClass } from '../../../shared/models/modal.model';

@Component({
  selector: 'app-params-concepts-list',
  templateUrl: './params-concepts-list.component.html',
  styleUrls: ['./params-concepts-list.component.scss'],
})
export class ParamsConceptsListComponent implements OnInit {
  conceptList: ParamsConceptsDataClass[] = [];
  pageOfItems: any[] = [];
  componetModal!: ModalClass;

  @ViewChildren('iconToggle') iconToggles!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private modalService: ModalService,
    private alertsService: AlertsService,
    private store: Store<AppStateWithConceptsList>,
    private paramsConceptsService: ParamsConceptsService
  ) {}

  ngOnInit(): void {
    this.store.select('paramsConcepts').subscribe((conceptsList) => {
      this.conceptList = conceptsList;
    });
  }

  onChangePage(pageOfItems: any[]) {
    this.pageOfItems = pageOfItems;
  }

  async checkInput(e: any, id: string, conceptCode: number) {
    if (e.target.checked === false) {
      if (await this.validationDeleteToggle(e)) {
        this.deleteConcept(e, id, conceptCode);
        return;
      }
    } else {
      this.deleteConcept(e, id, conceptCode);
    }
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

  deleteConcept(e: any, id: string, conceptCode: number) {
    this.alertsService.createLoading();
    const status: number = e.target.checked ? 1 : 0;
    const body = {
      conceptCode,
      status,
    };
    this.paramsConceptsService.deleteConcept(body).subscribe(({ status }) => {
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
      'ModalFormParamsConceptsComponent',
      modalB,
      ''
    );
    modalB.show();
  }

  openEdit(item: ParamsConceptsDataClass) {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'ModalFormParamsConceptsComponent',
      modalB,
      item
    );
    modalB.show();
  }
}
