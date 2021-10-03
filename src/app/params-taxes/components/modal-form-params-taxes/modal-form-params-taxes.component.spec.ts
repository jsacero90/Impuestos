import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormParamsTaxesComponent } from './modal-form-params-taxes.component';

describe('ModalFormParamsTaxesComponent', () => {
  let component: ModalFormParamsTaxesComponent;
  let fixture: ComponentFixture<ModalFormParamsTaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormParamsTaxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormParamsTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
