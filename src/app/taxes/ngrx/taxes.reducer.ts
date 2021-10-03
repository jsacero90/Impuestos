import { Action, createReducer, on } from '@ngrx/store';
import { TaxesDataModel } from '../models/taxes.model';
import * as taxesActions from './taxes.actions';
import { AppState } from '../../store/app.reducers';

export interface AppStateWithTaxe extends AppState {
  taxes: TaxesDataModel;
}

export const initialState: TaxesDataModel = {
  taxes: [],
};

const _taxesReducer = createReducer(
  initialState,

  on(taxesActions.resetTaxes, (state) => initialState),
  on(taxesActions.loadTaxes, (state, { dataTaxes }) => ({
    ...state,
    ...dataTaxes,
  }))
);

export function taxesReducer(
  state: TaxesDataModel | undefined,
  action: Action
) {
  return _taxesReducer(state, action);
}
