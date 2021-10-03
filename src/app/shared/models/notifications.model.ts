export interface Notification {
  notificationId: string;
  notificationType: string;
  textTitle?: string;
  text: string;
}

export interface BuildNotification {
  idNotification: string;
}

export class NotificationClass {
  public idNotification: string;

  constructor(idNotification: string) {
    this.idNotification = idNotification;
  }
}
