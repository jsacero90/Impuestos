import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesPreviewMakeComponent } from './taxes-preview-make.component';

describe('TaxesPreviewMakeComponent', () => {
  let component: TaxesPreviewMakeComponent;
  let fixture: ComponentFixture<TaxesPreviewMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxesPreviewMakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesPreviewMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
