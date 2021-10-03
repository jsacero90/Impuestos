import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as actionsTaxes from '../../ngrx/taxes.actions';
import { AppStateWithTaxe } from '../../ngrx/taxes.reducer';

import { AlertsService } from 'src/app/shared/services/alerts.service';
import { TaxesService } from '../../services/taxes.service';

@Component({
  selector: 'app-taxes-date-filter',
  templateUrl: './taxes-date-filter.component.html',
  styleUrls: ['./taxes-date-filter.component.scss'],
})
export class TaxesDateFilterComponent implements OnInit {
  forma!: FormGroup;
  taxesSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithTaxe>,
    private taxesService: TaxesService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchTaxesDataParams();
  }

  ngOnDestroy(): void {
    this.taxesSubscription.unsubscribe();
  }

  createForm() {
    this.forma = this.fb.group({
      oneDate: ['', [Validators.required]],
      enableOneDate: [true],
      dateStart: [{ value: '', disabled: true }, [Validators.required]],
      dateEnd: [{ value: '', disabled: true }, [Validators.required]],
      enableRangeDate: [false],
    });
    console.log(this.forma);
  }

  get oneDateInValid() {
    return (
      this.forma.get('oneDate')?.invalid && this.forma.get('oneDate')?.touched
    );
  }

  get oneDateValid() {
    return (
      this.forma.get('oneDate')?.valid && this.forma.get('oneDate')?.touched
    );
  }

  get dateStartInValid() {
    return (
      this.forma.get('dateStart')?.invalid &&
      this.forma.get('dateStart')?.touched
    );
  }

  get dateStartValid() {
    return (
      this.forma.get('dateStart')?.valid && this.forma.get('dateStart')?.touched
    );
  }

  get dateEndInValid() {
    return (
      this.forma.get('dateEnd')?.invalid && this.forma.get('dateEnd')?.touched
    );
  }

  get dateEndValid() {
    return (
      this.forma.get('dateEnd')?.valid && this.forma.get('dateEnd')?.touched
    );
  }

  changeCheck(checkbox: any) {
    switch (checkbox.target.id) {
      case 'enableOneDate':
        checkbox.target.checked === true
          ? this.enableElementInput(1)
          : this.enableElementInput(2);
        return;

      case 'enableRangeDate':
        checkbox.target.checked === true
          ? this.enableElementInput(2)
          : this.enableElementInput(1);
        return;
    }
  }

  clearForm() {
    this.forma.reset({
      oneDate: { value: '', disabled: false },
      enableOneDate: true,
      dateStart: { value: '', disabled: true },
      dateEnd: { value: '', disabled: true },
      enableRangeDate: false,
    });
  }

  enableElementInput(type: number) {
    switch (type) {
      case 1:
        return this.forma.reset({
          enableOneDate: true,
          oneDate: { value: '', disabled: false },
          dateStart: { value: '', disabled: true },
          dateEnd: { value: '', disabled: true },
          enableRangeDate: false,
        });

      case 2:
        return this.forma.reset({
          enableOneDate: false,
          oneDate: { value: '', disabled: true },
          dateStart: { value: '', disabled: false },
          dateEnd: { value: '', disabled: false },
          enableRangeDate: true,
        });
    }
  }

  send() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    console.log(this.forma);

    // llama consulta de servicio segun activacion de campos
    this.changeCheckReport();

    this.clearForm();
  }

  fetchTaxesDataParams(dateStart?: string, dateEnd?: string) {
    this.taxesSubscription = this.taxesService
      .getAllDataParams(dateStart, dateEnd)
      .subscribe((data: any) => {
        this.store.dispatch(actionsTaxes.loadTaxes({ dataTaxes: data }));
        console.log('Data =>', data);
        this.alertsService.closeSwal();
      });
  }

  formatDate(date: string) {
    let dataArray = date.split('-');
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
  }

  oneDateReport() {
    // TODO: activar cuando se envie la data correcta del formulario
    this.fetchTaxesDataParams(
      this.formatDate(this.forma.get('oneDate')?.value),
      this.formatDate(this.forma.get('oneDate')?.value)
    );
  }

  rangeDateReport() {
    // TODO: Envio rango de fechas
    this.fetchTaxesDataParams(
      this.formatDate(this.forma.get('dateStart')?.value),
      this.formatDate(this.forma.get('dateEnd')?.value)
    );
  }

  // TODO: funcion que activa consulta segun campos activados.
  changeCheckReport() {
    this.alertsService.createLoading();

    if (this.forma.get('enableOneDate')?.value === true) {
      this.oneDateReport();
    } else if (this.forma.get('enableRangeDate')?.value === true) {
      this.rangeDateReport();
    } else {
      // TODO: funcion que activa consulta reporte del dia anterior.
    }
  }
}
