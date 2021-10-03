import { Action, createReducer, on } from '@ngrx/store';
import * as taxesActions from './params-taxes.actions';
import { AppState } from '../../store/app.reducers';
import { ParamsTaxesClass } from '../models/params-taxes.model';

export interface AppStateWithTaxesList extends AppState {
  paramsTaxes: ParamsTaxesClass[];
}

export const initialState: ParamsTaxesClass[] = [];

const _paramsTaxesReducer = createReducer(
  initialState,

  on(taxesActions.resetParamsTaxes, (state) => initialState),
  on(taxesActions.loadParamsTaxes, (state, { TaxesList }) => {
    return [...state, ...TaxesList];
  })
);

export function paramsTaxesReducer(state: ParamsTaxesClass[], action: Action) {
  return _paramsTaxesReducer(state, action);
}
