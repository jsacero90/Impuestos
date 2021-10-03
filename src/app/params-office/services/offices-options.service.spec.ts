import { TestBed } from '@angular/core/testing';

import { OfficesOptionsService } from './offices-options.service';

describe('OfficesOptionsService', () => {
  let service: OfficesOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficesOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
