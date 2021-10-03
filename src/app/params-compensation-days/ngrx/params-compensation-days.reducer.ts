import { Action, createReducer, on } from '@ngrx/store';
import * as compensatoryActions from './params-compensation-days.actions';
import { AppState } from '../../store/app.reducers';
import { ParamsCompensationDaysData } from '../models/params-compensation-days.model';

export interface AppStateWithCompensationList extends AppState {
  paramsCompensationDays: ParamsCompensationDaysData[];
}

export const initialState: ParamsCompensationDaysData[] = [];

const _paramsCompensationDaysReducer = createReducer(
  initialState,

  on(compensatoryActions.resetParamsCompensationDays, (state) => initialState),
  on(
    compensatoryActions.loadParamsCompensationDays,
    (state, { compensationList }) => {
      return [...state, ...compensationList];
    }
  )
);

export function paramscompensationDaysReducer(
  state: ParamsCompensationDaysData[],
  action: Action
) {
  return _paramsCompensationDaysReducer(state, action);
}
