import { createAction, props } from '@ngrx/store';
import {
  ParamsCompensationDaysClass,
  ParamsCompensationDaysData,
} from '../models/params-compensation-days.model';

export const resetParamsCompensationDays = createAction(
  '[ParamsCompensationDays Component] Reset data ParamsCompensationDays'
);
export const loadParamsCompensationDays = createAction(
  '[ParamsCompensationDays Component] Load data ParamsCompensationDays',
  props<{ compensationList: ParamsCompensationDaysData[] }>()
);
