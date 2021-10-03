import { Store } from '@ngrx/store';
import { ParamsOfficesService } from './../../services/params-offices.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AlertsService } from '../../../shared/services/alerts.service';
import { AppStateWithOfficeList } from '../../ngrx/params-office.reducer';
import * as officeActions from '../../ngrx/params-office.actions';
import { DataParamsOffice } from '../../models/params-office.model';

@Component({
  selector: 'app-params-office-filter',
  templateUrl: './params-office-filter.component.html',
  styleUrls: ['./params-office-filter.component.scss'],
})
export class ParamsOfficeFilterComponent implements OnInit, OnDestroy {
  forma!: FormGroup;
  obs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private paramsServices: ParamsOfficesService,
    private alertsService: AlertsService,
    private store: Store<AppStateWithOfficeList>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setPetitionHttp();
  }

  ngOnDestroy(): void {
    //this.obs.forEach(subscription => subscription.unsubscribe());
  }

  createForm() {
    this.forma = this.fb.group({
      codeOffice: ['', [Validators.required]],
      nameOffice: ['', [Validators.required]],
    });
  }

  get codeOfficeInValid() {
    return (
      this.forma.get('codeOffice')?.invalid &&
      this.forma.get('codeOffice')?.touched
    );
  }

  get codeOfficesValid() {
    return (
      this.forma.get('codeOffice')?.valid &&
      this.forma.get('codeOffice')?.touched
    );
  }

  get nameOfficeInValid() {
    return (
      this.forma.get('nameOffice')?.invalid &&
      this.forma.get('nameOffice')?.touched
    );
  }

  get nameOfficeValid() {
    return (
      this.forma.get('nameOffice')?.valid &&
      this.forma.get('nameOffice')?.touched
    );
  }

  setPetitionHttp() {
    this.forma
      .get('codeOffice')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((data) => {
        if (data === '') {
          return;
        }
        this.alertsService.createLoading();
        this.getServiceListOffices(1);
      });

    this.forma
      .get('nameOffice')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((data) => {
        if (data === '') {
          return;
        }
        this.alertsService.createLoading();
        this.getServiceListOffices(2);
      });
  }

  infoInput(input: number) {
    switch (input) {
      case 1:
        this.forma.get('codeOffice')?.value != ''
          ? this.forma.get('nameOffice')?.disable()
          : this.forma.get('nameOffice')?.enable();
        return;
      case 2:
        this.forma.get('nameOffice')?.value != ''
          ? this.forma.get('codeOffice')?.disable()
          : this.forma.get('codeOffice')?.enable();
        return;
    }
  }

  clear() {
    this.forma.reset({
      codeOffice: { value: '', disabled: false },
      nameOffice: { value: '', disabled: false },
    });
  }

  getServiceListOffices(typeSearch: number) {
    switch (typeSearch) {
      case 1:
        this.paramsServices
          .getOficces({
            officeCode: this.forma.get('codeOffice')?.value,
            officeName: '',
          })
          ?.subscribe(({ data }) => this.loadDateStore(data));
        break;

      case 2:
        this.paramsServices
          .getOficces({
            officeCode: '0',
            officeName: this.forma.get('nameOffice')?.value,
          })
          ?.subscribe(({ data }) => this.loadDateStore(data));
        break;
    }
  }

  loadDateStore(data: DataParamsOffice[]) {
    console.log('en filter', data);
    if (!data) {
      this.alertsService.closeSwal();
      console.error('Error al consultar oficinas');
      // TODO: crear notificación error al traer data

      return;
    }
    this.store.dispatch(officeActions.resetParamsOffice());
    this.store.dispatch(officeActions.loadParamsOffice({ officeList: data }));
    this.alertsService.closeSwal();
  }
}
