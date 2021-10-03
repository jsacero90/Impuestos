import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormParamsConceptsComponent } from './modal-form-params-concepts.component';

describe('ModalFormParamsConceptsComponent', () => {
  let component: ModalFormParamsConceptsComponent;
  let fixture: ComponentFixture<ModalFormParamsConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormParamsConceptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormParamsConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
