import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { Modal } from 'bootstrap';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent changeCheck method enableOneDate true', () => {
    /*  component.changeCheck({
      target: {
        id: 'enableOneDate',
        checked: true,
      },
    });
    expect(component.forma.get('enableOneDate')).toBeTrue(); */
  });
});
