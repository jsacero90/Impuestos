import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsCompensationDaysViewComponent } from './params-compensation-days-view.component';

describe('ParamsCompensationDaysViewComponent', () => {
  let component: ParamsCompensationDaysViewComponent;
  let fixture: ComponentFixture<ParamsCompensationDaysViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsCompensationDaysViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsCompensationDaysViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
