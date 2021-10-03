import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsConceptsViewComponent } from './params-concepts-view.component';

describe('ParamsConceptsViewComponent', () => {
  let component: ParamsConceptsViewComponent;
  let fixture: ComponentFixture<ParamsConceptsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsConceptsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsConceptsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
