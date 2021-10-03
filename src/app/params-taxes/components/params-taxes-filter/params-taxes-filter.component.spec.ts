import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsTaxesFilterComponent } from './params-taxes-filter.component';

describe('ParamsTaxesFilterComponent', () => {
  let component: ParamsTaxesFilterComponent;
  let fixture: ComponentFixture<ParamsTaxesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsTaxesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsTaxesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
