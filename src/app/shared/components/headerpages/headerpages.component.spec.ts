import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpagesComponent } from './headerpages.component';

describe('HeaderpagesComponent', () => {
  let component: HeaderpagesComponent;
  let fixture: ComponentFixture<HeaderpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
