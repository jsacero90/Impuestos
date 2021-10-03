import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsConceptsListComponent } from './params-concepts-list.component';

describe('ParamsConceptsListComponent', () => {
  let component: ParamsConceptsListComponent;
  let fixture: ComponentFixture<ParamsConceptsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsConceptsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsConceptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
