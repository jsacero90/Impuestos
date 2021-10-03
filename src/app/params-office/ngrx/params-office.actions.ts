import { createAction, props } from '@ngrx/store';
import { DataParamsOffice } from '../models/params-office.model';

export const resetParamsOffice = createAction(
  '[ParamsOffice Component] Reset data ParamsOffice'
);
export const loadParamsOffice = createAction(
  '[ParamsOffice Component] Load data ParamsOffice',
  props<{ officeList: DataParamsOffice[] }>()
);
