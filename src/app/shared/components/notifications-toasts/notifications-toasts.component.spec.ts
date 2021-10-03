import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsToastsComponent } from './notifications-toasts.component';
import { NotificationClass } from '../../models/notifications.model';
import { appReducers, AppState } from 'src/app/store/app.reducers';
import { Store, StoreModule } from '@ngrx/store';
import notificationsErrorLst from '../../../../assets/json/notifications/error-notifications.json';
import notificationsWarningLst from '../../../../assets/json/notifications/warning-notifications.json';
import notificationsSuccessLst from '../../../../assets/json/notifications/success-notifications.json';

describe('NotificationsToastsComponent', () => {
  let component: NotificationsToastsComponent;
  let fixture: ComponentFixture<NotificationsToastsComponent>;

  const initialState = [
    new NotificationClass('e1'),
    new NotificationClass('s1'),
    new NotificationClass('w2'),
  ];

  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsToastsComponent],
      imports: [StoreModule.forRoot(appReducers)],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(NotificationsToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NotificationsToastsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Validate data inicial', () => {
    expect(component.notifications).toBeTruthy();
  });

  it('validate data true', () => {
    expect(component.getTypeNotification(notificationsErrorLst, 'e1')).toEqual(
      notificationsErrorLst[0]
    );
  });

  it('validate data false', () => {
    expect(component.getTypeNotification(notificationsErrorLst, 'e0')).toEqual(
      notificationsErrorLst[1]
    );
  });

  it('validate case buildNotification case error', () => {
    expect(component.buildNotification([new NotificationClass('e1')])).toEqual([
      notificationsErrorLst[0],
    ]);
  });

  it('validate case buildNotification case warning', () => {
    expect(component.buildNotification([new NotificationClass('w1')])).toEqual([
      notificationsWarningLst[0],
    ]);
  });

  it('validate case buildNotification case success', () => {
    expect(component.buildNotification([new NotificationClass('s1')])).toEqual([
      notificationsSuccessLst[0],
    ]);
  });
});
