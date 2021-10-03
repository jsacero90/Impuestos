import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { appReducers } from 'src/app/store/app.reducers';
import {
  AppStateWithOfficeList,
  paramsOfficeReducer,
} from '../../ngrx/params-office.reducer';
import { ParamsOfficesService } from '../../services/params-offices.service';
import * as officeActions from '../../ngrx/params-office.actions';
import { ParamsOfficeFilterComponent } from './params-office-filter.component';

describe('ParamsOfficeFilterComponent', () => {
  let component: ParamsOfficeFilterComponent;
  let fixture: ComponentFixture<ParamsOfficeFilterComponent>;
  let store: Store<AppStateWithOfficeList>;
  let alertsService: AlertsService;
  let paramsServices: ParamsOfficesService;

  const resp = {
    status: {
      statusCode: 0,
      statusDescription: 'Exitoso',
      layerName: 'Capa de servicio',
    },
    data: [
      {
        officeCode: 1,
        officeName: 'CALI PRINCIPAL',
        costCenter: 276,
        uccId: 2,
        establishmentCode: '4023000013',
        currentOfficeCode: 0,
        officeStatus: 0,
      },
    ],
    base64Encoded: false,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ParamsOfficeFilterComponent],
        imports: [
          HttpClientModule,
          ReactiveFormsModule,
          StoreModule.forRoot(appReducers),
          StoreModule.forFeature('params-office', paramsOfficeReducer),
        ],
        providers: [ParamsOfficesService, AlertsService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(Store);
    alertsService = TestBed.inject(AlertsService);
    paramsServices = TestBed.inject(ParamsOfficesService);
    fixture = TestBed.createComponent(ParamsOfficeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Button resert', () => {
    component.clear();
    expect(component.forma.value).toEqual({ codeOffice: '', nameOffice: '' });
  });

  it('disable InputCodeOfficer', () => {
    component.forma.reset({ nameOffice: 'prueba' });
    component.infoInput(2);
    expect(component.forma.get('codeOffice')?.disabled).toBeTruthy();
  });

  it('enable InputCodeOfficer', () => {
    component.infoInput(2);
    expect(component.forma.get('codeOffice')?.enable).toBeTruthy();
  });

  it('disable InputNameOfficer', () => {
    component.forma.reset({ codeOffice: 'prueba' });
    component.infoInput(1);
    expect(component.forma.get('nameOffice')?.disabled).toBeTruthy();
  });

  it('enable InputNameOfficer', () => {
    component.infoInput(1);
    expect(component.forma.get('nameOffice')?.enable).toBeTruthy();
  });

  it('test getServiceListOffices 1', () => {
    component.forma.reset({ codeOffice: '1' });
    component.getServiceListOffices(1);
    paramsServices
      .getOficces({
        officeCode: component.forma.get('codeOffice')?.value,
        officeName: '',
      })
      ?.subscribe(({ data }) => {
        expect(data).toEqual(resp.data);
        alertsService.closeSwal();
      });
  });

  it('test getServiceListOffices 1', () => {
    component.forma.reset({ nameOffice: 'CALI PRINCIPAL' });
    component.getServiceListOffices(2);
    paramsServices
      .getOficces({
        officeCode: '0',
        officeName: component.forma.get('nameOffice')?.value,
      })
      ?.subscribe(({ data }) => {
        expect(data).toEqual(resp.data);
        alertsService.closeSwal();
      });
  });

  it('test loadDateStore', () => {
    component.loadDateStore(resp.data);
  });

  /*   it('test setPetitionHttp', () => {
    component.setPetitionHttp();
  }); */
});
