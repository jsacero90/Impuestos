import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxesDateFilterComponent } from './taxes-date-filter.component';

// ngrx
import { StoreModule, Store } from '@ngrx/store';
import { AppStateWithTaxe, taxesReducer } from '../../ngrx/taxes.reducer';
import { appReducers } from 'src/app/store/app.reducers';

// modules
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TaxesRoutingModule } from '../../taxes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaxesDateFilterComponent', () => {
  let component: TaxesDateFilterComponent;
  let fixture: ComponentFixture<TaxesDateFilterComponent>;

  const initialState = {
    dates: [
      {
        date: '09/08/2012',
        totalAmount: 523421580,
        totalQuantity: 48,
        taxCategories: [
          {
            name: 'IMPUESTOS DISTRITALES',
            totalAmount: 523421580,
            totalQuantity: 48,
            schedules: [
              {
                code: '1',
                type: 'HORARIO ADICIONAL',
                totalAmount: 454212154,
                totalQuantity: 30,
                collections: [
                  {
                    entity: 'ATH',
                    totalAmount: 454212154,
                    totalQuantity: 30,
                    operations: [
                      {
                        code: '27090',
                        name: 'IND. Y COM. SUGERIDO ICA',
                        totalQuantity: 30,
                        totalAmount: 454212154,
                      },
                    ],
                  },
                ],
              },
              {
                code: '0',
                type: 'HORARIO NORMAL',
                totalAmount: 69209426,
                totalQuantity: 18,
                collections: [
                  {
                    entity: 'ATH',
                    totalAmount: 69209426,
                    totalQuantity: 18,
                    operations: [
                      {
                        code: '2700',
                        name: 'PREDIAL SUGERIDO',
                        totalQuantity: 10,
                        totalAmount: 43521426,
                      },
                      {
                        code: '27090',
                        name: 'IND. Y COM. SUGERIDO ICA',
                        totalQuantity: 8,
                        totalAmount: 25688000,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  let store: Store<AppStateWithTaxe>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TaxesDateFilterComponent],
        imports: [
          AppRoutingModule,
          HttpClientModule,
          TaxesRoutingModule,
          ReactiveFormsModule,
          StoreModule.forRoot(appReducers),
          StoreModule.forFeature('taxes', taxesReducer),
        ],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(TaxesDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaxesDateFilterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return an invalid form', () => {
    const fixture = TestBed.createComponent(TaxesDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const oneDate = component.forma.controls['oneDate'];
    oneDate.setValue('');

    expect(component.forma.invalid).toBeTrue();
  });

  it('should return an valid form', () => {
    const fixture = TestBed.createComponent(TaxesDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const oneDate = component.forma.controls['oneDate'];
    oneDate.setValue('04-02-2020');

    expect(component.forma.valid).toBeTrue();
  });

  it('should return an range invalid form', () => {
    const fixture = TestBed.createComponent(TaxesDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const dateStart = component.forma.controls['dateStart'];
    dateStart.setValue('04-02-2020');

    const dateEnd = component.forma.controls['dateEnd'];
    dateEnd.setValue('04-02-2020');

    expect(component.forma.invalid).toBeTrue();
  });

  it('should create TaxesDateFilterComponent clearForm method', () => {
    expect(component.clearForm()).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent clearForm method', () => {
    expect(component.formatDate('04-02-2020')).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent oneDateReport method', () => {
    expect(component.oneDateReport()).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent oneDateReport and fetchTaxesDataParams method', () => {
    expect(
      component.fetchTaxesDataParams('04-02-2020', '10-08-2021')
    ).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent rangeDateReport method', () => {
    expect(component.rangeDateReport()).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent changeCheckReport method', () => {
    expect(component.changeCheckReport()).toBeTruthy();
  });

  it('should create TaxesDateFilterComponent changeCheck method enableOneDate true', () => {
    component.changeCheck({
      target: {
        id: 'enableOneDate',
        checked: true,
      },
    });
    expect(component.forma.get('enableOneDate')).toBeTrue();
  });

  it('should create TaxesDateFilterComponent changeCheck method enableRangeDate true', () => {
    component.changeCheck({
      target: {
        id: 'enableRangeDate',
        checked: true,
      },
    });
    expect(component.forma.get('enableRangeDate')).toBeTrue();
  });

  it('should create TaxesDateFilterComponent enableElementInput case 1 method', () => {
    expect(component.enableElementInput(1)).toEqual();
  });
  it('should create TaxesDateFilterComponent enableElementInput case 2 method', () => {
    expect(component.enableElementInput(2)).toEqual();
  });

  it('should create TaxesDateFilterComponent send  method', () => {
    expect(component.send()).toBeTruthy();
  });
});
