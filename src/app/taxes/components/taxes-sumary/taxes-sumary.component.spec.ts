import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxesSumaryComponent } from './taxes-sumary.component';

// ngrx
import { StoreModule, Store } from '@ngrx/store';
import { AppStateWithTaxe, taxesReducer } from '../../ngrx/taxes.reducer';
import { appReducers } from 'src/app/store/app.reducers';

// modules
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TaxesRoutingModule } from '../../taxes-routing.module';

describe('TaxesSumaryComponent', () => {
  let component: TaxesSumaryComponent;
  let fixture: ComponentFixture<TaxesSumaryComponent>;
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
      {
        date: '10/08/2012',
        totalAmount: 15487236,
        totalQuantity: 25,
        taxCategories: [
          {
            name: 'IMPUESTOS DISTRITALES',
            totalAmount: 15487236,
            totalQuantity: 25,
            schedules: [
              {
                code: '1',
                type: 'HORARIO ADICIONAL',
                totalAmount: 15487236,
                totalQuantity: 25,
                collections: [
                  {
                    entity: 'VENTANILLA',
                    totalAmount: 15487236,
                    totalQuantity: 25,
                    operations: [
                      {
                        code: '27090',
                        name: 'IND. Y COM. SUGERIDO ICA',
                        totalQuantity: 25,
                        totalAmount: 15487236,
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
        declarations: [TaxesSumaryComponent],
        imports: [
          AppRoutingModule,
          HttpClientModule,
          TaxesRoutingModule,
          StoreModule.forRoot(appReducers),
          StoreModule.forFeature('taxes', taxesReducer),
        ],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(TaxesSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaxesSumaryComponent', () => {
    expect(component).toBeTruthy();
  });
});
