import { createAction, props } from '@ngrx/store';
import { TaxesDataModel } from '../models/taxes.model';

export const resetTaxes = createAction('[Taxes Component] Reset data Taxes');
export const loadTaxes = createAction(
  '[Taxes Component] Load data Taxes',
  props<{ dataTaxes: TaxesDataModel }>()
);
