import { createAction, props } from '@ngrx/store';

export const reset = createAction('Reset Notificacion');

export const create = createAction(
  'Crear Notificacion',
  props<{ idNotification: string }>()
);
