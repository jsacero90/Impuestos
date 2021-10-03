import { TestBed } from '@angular/core/testing';

import { CategoryTaxesService } from './category-taxes.service';

describe('CategoryTaxesService', () => {
  let service: CategoryTaxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTaxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
