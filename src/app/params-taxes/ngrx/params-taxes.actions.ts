import { createAction, props } from '@ngrx/store';
import { ParamsTaxesClass } from '../models/params-taxes.model';

export const resetParamsTaxes = createAction(
  '[ParamsTaxes Component] Reset data ParamsTaxes'
);
export const loadParamsTaxes = createAction(
  '[ParamsTaxes Component] Load data ParamsTaxes',
  props<{ TaxesList: ParamsTaxesClass[] }>()
);
