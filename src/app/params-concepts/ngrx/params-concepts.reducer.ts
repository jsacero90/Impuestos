import { Action, createReducer, on } from '@ngrx/store';
import * as conceptsActions from './params-concepts.actions';
import { AppState } from '../../store/app.reducers';
import { ParamsConceptsDataClass } from '../models/params-concepts.model';

export interface AppStateWithConceptsList extends AppState {
  paramsConcepts: ParamsConceptsDataClass[];
}

export const initialState: ParamsConceptsDataClass[] = [];

const _paramsConceptsReducer = createReducer(
  initialState,

  on(conceptsActions.resetParamsConcepts, (state) => initialState),
  on(conceptsActions.loadParamsConcepts, (state, { conceptsList }) => [
    ...state,
    ...conceptsList,
  ])
);

export function paramsConceptsReducer(
  state: ParamsConceptsDataClass[],
  action: Action
) {
  return _paramsConceptsReducer(state, action);
}
