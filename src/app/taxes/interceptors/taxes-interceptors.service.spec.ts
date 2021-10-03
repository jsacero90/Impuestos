import { TestBed } from '@angular/core/testing';

import { TaxesInterceptorsService } from './taxes-interceptors.service';

describe('TaxesInterceptorsService', () => {
  let service: TaxesInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxesInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
