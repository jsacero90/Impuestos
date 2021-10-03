import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { Modal } from 'bootstrap';
import { ParamsOfficeFormComponent } from '../../../params-office/components/params-office-form/params-office-form.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ParamsOfficeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should modal ', () => {
    expect(component.ngOnInit()).toBeTruthy();
  });

  it('should modal create', () => {
    const modalB = new Modal('#exampleModal', {
      keyboard: false,
      backdrop: 'static',
      focus: true,
    });
    const newModal = component.loadComponent(ParamsOfficeFormComponent, modalB);
    expect(newModal).toBeTruthy();
  });
});
