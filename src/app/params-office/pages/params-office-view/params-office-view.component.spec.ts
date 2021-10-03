import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsOfficeViewComponent } from './params-office-view.component';

describe('ParamsOfficeViewComponent', () => {
  let component: ParamsOfficeViewComponent;
  let fixture: ComponentFixture<ParamsOfficeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsOfficeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsOfficeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
