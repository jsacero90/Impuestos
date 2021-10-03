import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsOfficeListComponent } from './params-office-list.component';

describe('ParamsOfficeListComponent', () => {
  let component: ParamsOfficeListComponent;
  let fixture: ComponentFixture<ParamsOfficeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParamsOfficeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsOfficeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const open = component.open();

    expect(open).toBeTruthy();
  });
});
