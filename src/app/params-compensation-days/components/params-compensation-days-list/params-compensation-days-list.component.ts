import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ModalClass } from '../../../shared/models/modal.model';
import { ModalService } from '../../../shared/services/modal.service';
import { Modal } from 'bootstrap';
import { AlertsService } from 'src/app/shared/services/alerts.service';

import { Store } from '@ngrx/store';
import { AppStateWithCompensationList } from '../../ngrx/params-compensation-days.reducer';
import {
  ParamsCompensationDaysData,
  ParamsCompensationDaysClass,
} from '../../models/params-compensation-days.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-params-compensation-days-list',
  templateUrl: './params-compensation-days-list.component.html',
  styleUrls: ['./params-compensation-days-list.component.scss'],
})
export class ParamsCompensationDaysListComponent implements OnInit {
  componetModal!: ModalClass;
  subscription!: Subscription;
  compensationList: ParamsCompensationDaysData[] = [];

  pageOfItems: any[] = [];

  @ViewChildren('iconToggle') iconToggles!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private store: Store<AppStateWithCompensationList>,
    private alertsService: AlertsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.store
      .select('paramsCompensationDays')
      .subscribe((compensationList) => {
        this.compensationList = compensationList;
        console.log('list component', this.compensationList);
      });
  }

  openEdit(item: ParamsCompensationDaysClass) {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });

    this.componetModal = this.modalService.modalComponet(
      'ParamsCompensationDaysFormComponent',
      modalB,
      item
    );
    modalB.show();
  }
}
