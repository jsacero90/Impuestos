import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamsOfficesService } from '../../services/params-offices.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { Modal } from 'bootstrap';
import { DataModal } from 'src/app/shared/models/modal.model';
import { Store } from '@ngrx/store';
import * as actionsNotifications from '../../../shared/ngrx/notifications/notifications.actions';
import { AppStateWithTaxe } from 'src/app/taxes/ngrx/taxes.reducer';
import { OfficesOptionsService } from '../../services/offices-options.service';
import { CategoryTaxesService } from '../../services/category-taxes.service';
import { DataCategoryTaxes } from '../../models/category-taxes.model';
import { ParamsOfficeClass } from '../../models/params-office.model';
import * as paramsOfficeActions from '../../ngrx/params-office.actions';

@Component({
  selector: 'app-params-office-form',
  templateUrl: './params-office-form.component.html',
  styleUrls: ['./params-office-form.component.scss'],
})
export class ParamsOfficeFormComponent implements OnInit {
  public _data!: ParamsOfficeClass;

  get data(): ParamsOfficeClass {
    return this._data;
  }

  @Input()
  set data(value: ParamsOfficeClass) {
    this.dataModal = value;
    console.log(this.dataModal);
    if (value) {
      this.updateFrom(value);
      this.editabled = true;
    }
  }

  @Input() modal!: Modal;
  dataModal!: any;
  editabled: boolean = false;

  forma!: FormGroup;
  iconCheck: boolean = true;
  regions: Array<any> = [];
  cities: Array<any> = [];
  parentOffice: Array<any> = [];
  categoryTaxesList: DataCategoryTaxes[] = [];
  dataTaxes: any;

  constructor(
    private fb: FormBuilder,
    private paramsOfficesService: ParamsOfficesService,
    private officesOptionsService: OfficesOptionsService,
    private alertsService: AlertsService,
    private store: Store<AppStateWithTaxe>,
    private categoryTaxesService: CategoryTaxesService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.alertsService.createLoading();
    this.getRegions();
    this.getCities();
    this.getParentOffices();
    this.getCategoryTaxesList();
  }

  createForm() {
    this.forma = this.fb.group({
      officeCode: ['', [Validators.required]],
      officeName: ['', [Validators.required]],
      state: [true, [Validators.required]],
      city: ['', []],
      region: ['', []],
      officeParent: ['', []],
      acountCenter: ['', [Validators.required]],
      zonalCenter: ['', [Validators.required]],
      codeAdmin: ['', [Validators.required]],
      taxes: ['', [Validators.required]],
    });
  }

  clearForm() {
    this.forma.reset({
      officeCode: ['', [Validators.required]],
      officeName: ['', [Validators.required]],
      state: [true, [Validators.required]],
      city: ['', []],
      region: ['', []],
      officeParent: ['', []],
      acountCenter: ['', [Validators.required]],
      zonalCenter: ['', [Validators.required]],
      codeAdmin: ['', [Validators.required]],
      taxes: ['', [Validators.required]],
    });
  }

  updateFrom({
    officeCode,
    officeName,
    costCenter,
    establishmentCode,
    parentOffice,
    taxList,
    adminCode,
    region,
    city,
  }: ParamsOfficeClass) {
    const taxId = taxList.map((taxid) => {
      return taxid.code;
    });

    this.forma.reset({
      officeCode: { value: officeCode, disabled: true },
      officeName,
      state: { value: true },
      city: { value: city.cityId, disabled: true },
      region: { value: region.regionId, disabled: true },
      officeParent: { value: parentOffice, disabled: true },
      acountCenter: { value: costCenter, disabled: false },
      zonalCenter: { value: establishmentCode, disabled: false },
      codeAdmin: { value: adminCode.adminCode, disabled: false },
      taxes: { value: taxId, disabled: false },
    });
  }

  changeCheck(checkbox: any) {
    if (checkbox.target.checked === true) {
      this.iconCheck = true;
    } else if (checkbox.target.checked === false) {
      this.iconCheck = false;
    }
  }

  get officeCodeInValid() {
    return (
      this.forma.get('officeCode')?.invalid &&
      this.forma.get('officeCode')?.touched
    );
  }

  get officeCodeValid() {
    return (
      this.forma.get('officeCode')?.valid &&
      this.forma.get('officeCode')?.touched
    );
  }

  get officeNameInValid() {
    return (
      this.forma.get('officeName')?.invalid &&
      this.forma.get('officeName')?.touched
    );
  }

  get officeNameValid() {
    return (
      this.forma.get('officeName')?.valid &&
      this.forma.get('officeName')?.touched
    );
  }

  get stateInValid() {
    return this.forma.get('state')?.invalid && this.forma.get('state')?.touched;
  }

  get stateValid() {
    return this.forma.get('state')?.valid && this.forma.get('state')?.touched;
  }

  get cityInValid() {
    return (
      this.forma.get('city')?.value === '' && this.forma.get('city')?.touched
    );
  }

  get cityValid() {
    return this.forma.get('city')?.valid && this.forma.get('city')?.touched;
  }

  get regionInValid() {
    return (
      this.forma.get('region')?.value === '' &&
      this.forma.get('region')?.touched
    );
  }

  get regionValid() {
    return this.forma.get('region')?.valid && this.forma.get('region')?.touched;
  }

  get officeParentInValid() {
    return (
      this.forma.get('officeParent')?.value === '' &&
      this.forma.get('officeParent')?.touched
    );
  }

  get officeParentValid() {
    return (
      this.forma.get('officeParent')?.valid &&
      this.forma.get('officeParent')?.touched
    );
  }

  get acountCenterInValid() {
    return (
      this.forma.get('acountCenter')?.value === '' &&
      this.forma.get('acountCenter')?.touched
    );
  }

  get acountCenterValid() {
    return (
      this.forma.get('acountCenter')?.valid &&
      this.forma.get('acountCenter')?.touched
    );
  }

  get zonalCenterInValid() {
    return (
      this.forma.get('zonalCenter')?.value === '' &&
      this.forma.get('zonalCenter')?.touched
    );
  }

  get zonalCenterValid() {
    return (
      this.forma.get('zonalCenter')?.valid &&
      this.forma.get('zonalCenter')?.touched
    );
  }

  get codeAdminInValid() {
    return (
      this.forma.get('codeAdmin')?.value === '' &&
      this.forma.get('codeAdmin')?.touched
    );
  }

  get codeAdminValid() {
    return (
      this.forma.get('codeAdmin')?.valid && this.forma.get('codeAdmin')?.touched
    );
  }

  get taxesInValid() {
    return (
      this.forma.get('taxes')?.value === '' && this.forma.get('taxes')?.touched
    );
  }

  get taxesValid() {
    return this.forma.get('taxes')?.valid && this.forma.get('taxes')?.touched;
  }

  taxes() {
    let taxes = this.forma.get('taxes')?.value;
    this.dataTaxes = taxes.map((element: any) => {
      return { code: element };
    });
    console.log(this.dataTaxes);
  }

  async send() {
    if (!(await this.alertsService.modalAccept())) {
      return;
    }
    this.taxes();
    const body = {
      officeCode: parseInt(this.forma.get('officeCode')?.value),
      officeName: this.forma.get('officeName')?.value,
      costCenter: parseInt(this.forma.get('acountCenter')?.value),
      establishmentCode: parseInt(this.forma.get('zonalCenter')?.value),
      parentOffice: parseInt(this.forma.get('officeParent')?.value),
      taxList: this.dataTaxes,
      adminCode: {
        adminCode: parseInt(this.forma.get('codeAdmin')?.value),
      },
      region: {
        regionId: parseInt(this.forma.get('region')?.value),
      },
      city: {
        cityId: parseInt(this.forma.get('city')?.value),
      },
    };

    this.alertsService.createLoading();
    console.log(body);
    //return;
    this.saveData(body);
  }

  saveData(body: any) {
    this.paramsOfficesService.createOficce(body).subscribe(() => {
      this.alertsService.closeSwal();
      this.store.dispatch(actionsNotifications.reset());
      this.store.dispatch(
        actionsNotifications.create({ idNotification: 's4' })
      );
      this.closeModal();
    });
  }

  // Actualizacion de ofincinas
  async sendUpdate() {
    if (!(await this.alertsService.modalAccept())) {
      return;
    }
    this.taxes();
    const body = {
      officeCode: parseInt(this.forma.get('officeCode')?.value),
      officeName: this.forma.get('officeName')?.value,
      costCenter: parseInt(this.forma.get('acountCenter')?.value),
      establishmentCode: parseInt(this.forma.get('zonalCenter')?.value),
      parentOffice: parseInt(this.forma.get('officeParent')?.value),
      taxList: this.dataTaxes,
      adminCode: {
        adminCode: parseInt(this.forma.get('codeAdmin')?.value),
      },
      region: {
        regionId: parseInt(this.forma.get('region')?.value),
      },
      city: {
        cityId: parseInt(this.forma.get('city')?.value),
      },
    };

    this.alertsService.createLoading();
    console.log(body);
    console.log(body.taxList);
    this.updateOffice(body);
  }

  updateOffice(body: any) {
    this.paramsOfficesService.updateOficce(body).subscribe(() => {
      this.alertsService.closeSwal();
      this.store.dispatch(paramsOfficeActions.resetParamsOffice());
      this.store.dispatch(actionsNotifications.reset());
      this.store.dispatch(
        actionsNotifications.create({ idNotification: 's5' })
      );
    });
    this.closeModal();
  }
  // Actualizacion de ofincinas

  closeModal() {
    this.forma.reset();
    this.modal.hide();
  }

  getRegions() {
    this.officesOptionsService.getRegion()?.subscribe((data: any) => {
      this.regions = data.data;
      console.log(this.regions);
    });
  }

  getCities() {
    this.officesOptionsService.getCity().subscribe((city: any) => {
      this.cities = city.data;
      console.log(city.data);
    });
  }

  getParentOffices() {
    this.officesOptionsService.getOfficeParent().subscribe((office: any) => {
      this.parentOffice = office.data;
      console.log(this.parentOffice);
    });
  }

  getCategoryTaxesList() {
    let header = { code: 0, taxStatus: 1 };
    this.categoryTaxesService.getCategoryTaxes(header).subscribe(({ data }) => {
      if (!data) {
        console.error('Error al consultar oficinas');
        //crear notificación error al traer data
        this.alertsService.closeSwal();
        return;
      }
      this.categoryTaxesList = data;
      this.alertsService.closeSwal();
    });
  }
}
