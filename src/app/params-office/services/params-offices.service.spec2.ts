import { TestBed } from '@angular/core/testing';

import { ParamsOfficesService } from './params-offices.service';

describe('ParamsOfficesService', () => {
  let service: ParamsOfficesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsOfficesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
