import { createAction, props } from '@ngrx/store';
import { ParamsConceptsDataClass } from '../models/params-concepts.model';

export const resetParamsConcepts = createAction(
  '[ParamsConcepts Component] Reset data ParamsConcepts'
);
export const loadParamsConcepts = createAction(
  '[ParamsConcepts Component] Load data ParamsConcepts',
  props<{ conceptsList: ParamsConceptsDataClass[] }>()
);
