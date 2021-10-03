import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormReportsComponent } from './modal-form-reports.component';

describe('ModalFormReportsComponent', () => {
  let component: ModalFormReportsComponent;
  let fixture: ComponentFixture<ModalFormReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
