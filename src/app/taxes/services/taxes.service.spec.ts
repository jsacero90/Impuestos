import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { TaxesService } from './taxes.service';
import { NotificationClass } from '../../shared/models/notifications.model';

describe('TaxesService', () => {
  let service: TaxesService;
  let modelNotication: Notification;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [],
        imports: [HttpClientModule],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxesService);
  });

  it('should be created TaxesService', () => {
    expect(service).toBeTruthy();
  });
  it('should be created TaxesService method getFileTaxe', () => {
    expect(service.getFileTaxe()).toBeTruthy();
  });

  it('should be created TaxesService method getFileTaxe', () => {
    expect(service.getAllDataParams()).toBeTruthy();
  });
});
