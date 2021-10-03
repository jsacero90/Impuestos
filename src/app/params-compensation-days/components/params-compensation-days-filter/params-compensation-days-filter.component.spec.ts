import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsCompensationDaysFilterComponent } from './params-compensation-days-filter.component';

describe('ParamsCompensationDaysFilterComponent', () => {
  let component: ParamsCompensationDaysFilterComponent;
  let fixture: ComponentFixture<ParamsCompensationDaysFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsCompensationDaysFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsCompensationDaysFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
