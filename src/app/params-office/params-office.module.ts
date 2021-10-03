import { ParamsOfficeFilterComponent } from './components/params-office-filter/params-office-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ParamsOfficeRoutingModule } from './params-office-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ParamsOfficeViewComponent } from './pages/params-office-view/params-office-view.component';
import { ParamsOfficeListComponent } from './components/params-office-list/params-office-list.component';
import { paramsOfficeReducer } from './ngrx/params-office.reducer';
import { ParamsOfficeFormComponent } from './components/params-office-form/params-office-form.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

@NgModule({
  declarations: [
    ParamsOfficeViewComponent,
    ParamsOfficeFilterComponent,
    ParamsOfficeListComponent,
    ParamsOfficeFormComponent,
    ModalFormComponent,
  ],
  imports: [
    CommonModule,
    ParamsOfficeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('paramsOffice', paramsOfficeReducer),
  ],
  exports: [ParamsOfficeFormComponent],
  entryComponents: [ParamsOfficeFormComponent],
})
export class ParamsOfficeModule {}
