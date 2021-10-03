import { TestBed } from '@angular/core/testing';

import { ParamsTaxesService } from './params-taxes.service';

describe('ParamsTaxesService', () => {
  let service: ParamsTaxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsTaxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
