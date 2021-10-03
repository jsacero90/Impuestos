import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsConceptsFilterComponent } from './params-concepts-filter.component';

describe('ParamsConceptsFilterComponent', () => {
  let component: ParamsConceptsFilterComponent;
  let fixture: ComponentFixture<ParamsConceptsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsConceptsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsConceptsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
