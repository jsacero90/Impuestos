import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsCompensationDaysFormComponent } from './params-compensation-days-form.component';

describe('ParamsCompensationDaysFormComponent', () => {
  let component: ParamsCompensationDaysFormComponent;
  let fixture: ComponentFixture<ParamsCompensationDaysFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsCompensationDaysFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsCompensationDaysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
