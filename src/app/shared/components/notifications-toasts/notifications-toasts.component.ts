import { Component, OnDestroy, OnInit } from '@angular/core';

import notificationsErrorLst from '../../../../assets/json/notifications/error-notifications.json';
import notificationsWarningLst from '../../../../assets/json/notifications/warning-notifications.json';
import notificationsSuccessLst from '../../../../assets/json/notifications/success-notifications.json';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { Subscription } from 'rxjs';

import {
  BuildNotification,
  Notification,
} from '../../models/notifications.model';

@Component({
  selector: 'app-notifications-toasts',
  templateUrl: './notifications-toasts.component.html',
  styleUrls: ['./notifications-toasts.component.scss'],
})
export class NotificationsToastsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription!: Subscription;
  private dataSearch!: Notification;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('notifications')
      .subscribe((data) => this.buildNotification(data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buildNotification(buildNotifications: BuildNotification[]): Notification[] {
    const serchNotification = buildNotifications.map(({ idNotification }) => {
      switch (idNotification.charAt(0)) {
        case 'w':
          this.dataSearch = this.getTypeNotification(
            notificationsWarningLst,
            idNotification
          );
          break;
        case 'e':
          this.dataSearch = this.getTypeNotification(
            notificationsErrorLst,
            idNotification
          );
          break;
        case 's':
          this.dataSearch = this.getTypeNotification(
            notificationsSuccessLst,
            idNotification
          );
          break;
      }
      return { ...this.dataSearch };
    });
    return (this.notifications = [...serchNotification]);
  }

  getTypeNotification(listJson: Notification[], idNotification: string) {
    let itemNotification: Notification[] = [];
    listJson.map((data) => {
      if (data.notificationId === idNotification) {
        itemNotification = [{ ...data }];
      }
    });
    itemNotification =
      itemNotification.length === 0
        ? [{ ...notificationsErrorLst[1] }]
        : itemNotification;
    return itemNotification[0];
  }
}
