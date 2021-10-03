import { TestBed } from '@angular/core/testing';

import { ParamsCompensationDaysService } from './params-compensation-days.service';

describe('ParamsCompensationDaysService', () => {
  let service: ParamsCompensationDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsCompensationDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
