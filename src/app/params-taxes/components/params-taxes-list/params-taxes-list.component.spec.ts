import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsTaxesListComponent } from './params-taxes-list.component';

describe('ParamsTaxesListComponent', () => {
  let component: ParamsTaxesListComponent;
  let fixture: ComponentFixture<ParamsTaxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsTaxesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsTaxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
