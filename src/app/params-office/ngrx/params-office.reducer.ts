import { Action, createReducer, on } from '@ngrx/store';
import * as officesActions from './params-office.actions';
import { AppState } from '../../store/app.reducers';
import { DataParamsOffice } from '../models/params-office.model';

export interface AppStateWithOfficeList extends AppState {
  paramsOffice: DataParamsOffice[];
}

export const initialState: DataParamsOffice[] = [];

const _paramsOfficeReducer = createReducer(
  initialState,

  on(officesActions.resetParamsOffice, (state) => initialState),
  on(officesActions.loadParamsOffice, (state, { officeList }) => {
    return [...state, ...officeList];
  })
);

export function paramsOfficeReducer(state: DataParamsOffice[], action: Action) {
  return _paramsOfficeReducer(state, action);
}
