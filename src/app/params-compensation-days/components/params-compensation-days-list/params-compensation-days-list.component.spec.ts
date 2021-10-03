import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsCompensationDaysListComponent } from './params-compensation-days-list.component';

describe('ParamsCompensationDaysListComponent', () => {
  let component: ParamsCompensationDaysListComponent;
  let fixture: ComponentFixture<ParamsCompensationDaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsCompensationDaysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsCompensationDaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
