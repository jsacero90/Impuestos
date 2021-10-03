import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ParamsOfficeFormComponent } from './params-office-form.component';

describe('ParamsOfficeFormComponent', () => {
  let component: ParamsOfficeFormComponent;
  let fixture: ComponentFixture<ParamsOfficeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParamsOfficeFormComponent],
    }).compileComponents();
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ParamsOfficeFormComponent],
        imports: [
          AppRoutingModule,
          HttpClientModule,
          ParamsOfficeFormComponent,
          ReactiveFormsModule,
          FormsModule,
        ],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should closeModal', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#forma');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(10);
  });

  it('should create form', () => {
    const form = component.forma;
    const formaGroup = component.createForm();
    const formaValues = {};
    expect(formaGroup).toBeTruthy();
  });

  it('should return an range invalid form', () => {
    const fixture = TestBed.createComponent(ParamsOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const formGroup = component.createForm();
    const dateStart = component.forma.controls['officeCode'];
    dateStart.setValue('');

    const dateEnd = component.forma.controls['officeName'];
    dateEnd.setValue('');

    expect(component.forma.invalid).toBeTrue();
    expect(formGroup).toBeTruthy();
  });
});
