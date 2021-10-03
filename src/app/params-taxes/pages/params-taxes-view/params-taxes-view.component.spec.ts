import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsTaxesViewComponent } from './params-taxes-view.component';

describe('ParamsTaxesViewComponent', () => {
  let component: ParamsTaxesViewComponent;
  let fixture: ComponentFixture<ParamsTaxesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsTaxesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsTaxesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
