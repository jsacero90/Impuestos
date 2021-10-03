import { Action, createReducer, on } from '@ngrx/store';
import * as actionsNotifications from './notifications.actions';

import { NotificationClass } from '../../models/notifications.model';

export const initialState: NotificationClass[] = [];

const _notificationsReducer = createReducer(
  initialState,
  on(actionsNotifications.reset, (state) => initialState),
  on(actionsNotifications.create, (state, { idNotification }) => [
    ...state,
    new NotificationClass(idNotification),
  ])
);

export function notificationsReducer(
  state: NotificationClass[] | undefined,
  action: Action
) {
  return _notificationsReducer(state, action);
}
