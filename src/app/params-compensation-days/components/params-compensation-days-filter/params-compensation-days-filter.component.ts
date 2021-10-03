import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataCategoryTaxes } from 'src/app/params-compensation-days/models/category-taxes.model';
import { CategoryTaxesService } from 'src/app/params-compensation-days/services/category-taxes.service';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { ParamsCompensationDaysService } from 'src/app/params-compensation-days/services/params-compensation-days.service';
import data from '../../../../assets/json/data.json';
import { Store } from '@ngrx/store';
import { AppStateWithCompensationList } from '../../ngrx/params-compensation-days.reducer';
import { ParamsCompensationDaysData } from '../../models/params-compensation-days.model';
import * as compensationAction from '../../ngrx/params-compensation-days.actions';

@Component({
  selector: 'app-params-compensation-days-filter',
  templateUrl: './params-compensation-days-filter.component.html',
  styleUrls: ['./params-compensation-days-filter.component.scss'],
})
export class ParamsCompensationDaysFilterComponent implements OnInit {
  forma!: FormGroup;
  mounts: any;
  years: any;
  categoryTaxesList: DataCategoryTaxes[] = [];

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private categoryTaxesService: CategoryTaxesService,
    private paramsCompensationDaysService: ParamsCompensationDaysService,
    private store: Store<AppStateWithCompensationList>
  ) {
    this.alertsService.createLoading();
  }

  ngOnInit(): void {
    this.createForm();
    this.getCategoryTaxesList();
    this.mounts = data.mounts;
    //this.years = data.years;
    this.listYear();
  }

  listYear() {
    // del actual 10 años adelante
    const date = new Date();
    const year = date.getFullYear();
    const yearFin = year + 10;

    let newyears = [];
    for (let step = year; step <= yearFin; step++) {
      newyears.push(step);
    }
    console.log(newyears);

    // del actual 10 años atras
    const dateOld = new Date();
    const yearOld = dateOld.getFullYear() - 1;
    const yearOldFin = yearOld - 10;

    let yearsOld = [];
    for (let step = yearOld; step >= yearOldFin; step--) {
      yearsOld.push(step);
    }
    console.log(yearsOld);

    //concatenar listas
    this.years = [...newyears, ...yearsOld];
    console.log(this.years.sort());
  }

  createForm() {
    this.forma = this.fb.group({
      year: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
      mount: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
      taxe: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
    });
  }

  clear() {
    this.forma.reset({
      year: 'noSelect',
      mount: 'noSelect',
      taxe: 'noSelect',
    });
  }

  get yearInValid() {
    return this.forma.get('year')?.invalid && this.forma.get('year')?.touched;
  }

  get yearValid() {
    return (
      this.forma.get('year')?.valid &&
      this.forma.get('year')?.touched &&
      this.forma.get('year')?.value !== 'noSelect'
    );
  }

  get mountInValid() {
    return this.forma.get('mount')?.invalid && this.forma.get('mount')?.touched;
  }

  get mountValid() {
    return (
      this.forma.get('mount')?.valid &&
      this.forma.get('mount')?.touched &&
      this.forma.get('mount')?.value !== 'noSelect'
    );
  }
  get taxeInValid() {
    return this.forma.get('taxe')?.invalid && this.forma.get('taxe')?.touched;
  }

  get taxeValid() {
    return (
      this.forma.get('taxe')?.valid &&
      this.forma.get('taxe')?.touched &&
      this.forma.get('taxe')?.value !== 'noSelect'
    );
  }

  getCategoryTaxesList() {
    let header = { code: 0, taxStatus: 1 };
    this.categoryTaxesService.getCategoryTaxes(header).subscribe(({ data }) => {
      if (!data) {
        console.error('Error al consultar oficinas');
        // TODO: crear notificación error al traer data
        this.alertsService.closeSwal();
        return;
      }
      this.categoryTaxesList = data;
      this.alertsService.closeSwal();
    });
  }

  search() {
    if (this.forma.value == '-1') {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    this.getCompensationDays();
    console.log(this.forma.value);
    console.log(this.forma.value.year);
  }

  getCompensationDays() {
    this.alertsService.createLoading();
    this.paramsCompensationDaysService
      .getCompensationDays({
        year: this.forma.value.year,
        month: this.forma.value.mount,
        taxCategory: this.forma.value.taxe,
      })
      ?.subscribe(({ data }) => {
        this.loadDateStore(data);
        this.clear();
        this.alertsService.closeSwal();
      });
  }

  loadDateStore(data: ParamsCompensationDaysData[]) {
    if (!data) {
      this.alertsService.closeSwal();
      console.error('Error al consultar dias de compensacion');
      // TODO: crear notificación error al traer data

      return;
    }
    this.store.dispatch(compensationAction.resetParamsCompensationDays());
    this.store.dispatch(
      compensationAction.loadParamsCompensationDays({ compensationList: data })
    );
    this.alertsService.closeSwal();
  }
}
