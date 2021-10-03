import { TestBed } from '@angular/core/testing';

import { ParamsConceptsService } from './params-concepts.service';

describe('ParamsConceptsService', () => {
  let service: ParamsConceptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsConceptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
