import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { AlertsService } from '../../../shared/services/alerts.service';
import { CategoryTaxesService } from '../../services/category-taxes.service';
import { ParamsTaxesService } from '../../services/params-taxes.service';

import { ParamsTaxesClass } from '../../models/params-taxes.model';
import { DataCategoryTaxes } from '../../models/category-taxes.model';

import { Store } from '@ngrx/store';
import { AppStateWithTaxesList } from '../../ngrx/params-taxes.reducer';
import * as taxesActions from '../../ngrx/params-taxes.actions';

@Component({
  selector: 'app-params-taxes-filter',
  templateUrl: './params-taxes-filter.component.html',
  styleUrls: ['./params-taxes-filter.component.scss'],
})
export class ParamsTaxesFilterComponent implements OnInit {
  forma!: FormGroup;
  categoryTaxesList: DataCategoryTaxes[] = [];

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private paramsTaxesService: ParamsTaxesService,
    private categoryTaxesService: CategoryTaxesService,
    private store: Store<AppStateWithTaxesList>
  ) {
    this.alertsService.createLoading();
  }

  ngOnInit(): void {
    this.createForm();
    this.setPetitionHttp();
    this.getCategoryTaxesList();
  }

  createForm() {
    this.forma = this.fb.group({
      categoryTaxes: [
        'noSelect',
        [Validators.required, Validators.pattern('^((?!noSelect).)*$')],
      ],
      nameTypeTaxes: [{ value: '', disabled: true }, [Validators.required]],
      codeOpetation: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  get categoryTaxesInValid() {
    return (
      this.forma.get('categoryTaxes')?.invalid &&
      this.forma.get('categoryTaxes')?.touched &&
      this.forma.get('categoryTaxes')?.value === 'noSelect'
    );
  }

  get categoryTaxesValid() {
    return (
      this.forma.get('categoryTaxes')?.valid &&
      this.forma.get('categoryTaxes')?.touched &&
      this.forma.get('categoryTaxes')?.value !== 'noSelect'
    );
  }

  get nameTypeTaxesInValid() {
    return (
      this.forma.get('nameTypeTaxes')?.invalid &&
      this.forma.get('nameTypeTaxes')?.touched
    );
  }

  get nameTypeTaxesValid() {
    return (
      this.forma.get('nameTypeTaxes')?.valid &&
      this.forma.get('nameTypeTaxes')?.touched
    );
  }

  get codeOpetationInValid() {
    return (
      this.forma.get('codeOpetation')?.invalid &&
      this.forma.get('codeOpetation')?.touched
    );
  }

  get codeOpetationValid() {
    return (
      this.forma.get('codeOpetation')?.valid &&
      this.forma.get('codeOpetation')?.touched
    );
  }

  getCategoryTaxesList() {
    this.categoryTaxesService.getCategoryTaxes().subscribe(({ data }) => {
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

  selectChange() {
    if (this.forma.get('categoryTaxes')?.valid)
      return this.forma.reset({
        categoryTaxes: this.forma.get('categoryTaxes')?.value,
        nameTypeTaxes: { value: '', disabled: false },
        codeOpetation: { value: '', disabled: false },
      });
  }

  setPetitionHttp() {
    this.forma
      .get('codeOpetation')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((data) => {
        if (this.forma.get('categoryTaxes')?.value === '-1') {
          return;
        }
        if (data === '') {
          return;
        }
        this.alertsService.createLoading();
        this.getServiceListTaxes(1);
      });

    this.forma
      .get('nameTypeTaxes')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((data) => {
        if (this.forma.get('categoryTaxes')?.value === '-1') {
          return;
        }
        if (data === '') {
          return;
        }
        this.alertsService.createLoading();
        this.getServiceListTaxes(2);
      });
  }

  infoInput(input: number) {
    switch (input) {
      case 1:
        this.forma.get('nameTypeTaxes')?.value != ''
          ? this.forma.get('codeOpetation')?.disable()
          : this.forma.get('codeOpetation')?.enable();
        return;
      case 2:
        this.forma.get('codeOpetation')?.value != ''
          ? this.forma.get('nameTypeTaxes')?.disable()
          : this.forma.get('nameTypeTaxes')?.enable();
        return;
    }
  }

  clear() {
    this.forma.reset({
      categoryTaxes: 'noSelect',
      codeOpetation: { value: '', disabled: true },
      nameTypeTaxes: { value: '', disabled: true },
    });
  }

  getServiceListTaxes(typeSearch: number) {
    switch (typeSearch) {
      case 1:
        this.paramsTaxesService
          .getTaxes({
            tax: { code: this.forma.get('categoryTaxes')?.value },
            operationCode: this.forma.get('codeOpetation')?.value,
            description: null,
          })
          ?.subscribe(({ data }) => this.loadDateStore(data));
        break;

      case 2:
        this.paramsTaxesService
          .getTaxes({
            tax: { code: this.forma.get('categoryTaxes')?.value },
            operationCode: null,
            description: this.forma.get('nameTypeTaxes')?.value,
          })
          ?.subscribe(({ data }) => this.loadDateStore(data));
        break;
    }
  }

  loadDateStore(data: ParamsTaxesClass[]) {
    if (!data) {
      this.alertsService.closeSwal();
      console.error('Error al consultar oficinas');
      // TODO: crear notificación error al traer data

      return;
    }
    this.store.dispatch(taxesActions.resetParamsTaxes());
    this.store.dispatch(taxesActions.loadParamsTaxes({ TaxesList: data }));
    this.alertsService.closeSwal();
  }
}
