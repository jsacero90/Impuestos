import { ActionReducerMap } from '@ngrx/store';
import { BuildNotification } from '../shared/models/notifications.model';
import { notificationsReducer } from '../shared/ngrx/notifications/notifications.reducer';

export interface AppState {
  notifications: BuildNotification[];
}

export const appReducers: ActionReducerMap<AppState> = {
  notifications: notificationsReducer,
};
