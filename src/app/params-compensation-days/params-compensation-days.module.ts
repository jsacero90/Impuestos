import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamsCompensationDaysRoutingModule } from './params-compensation-days-routing.module';
import { ParamsCompensationDaysFilterComponent } from './components/params-compensation-days-filter/params-compensation-days-filter.component';
import { ParamsCompensationDaysListComponent } from './components/params-compensation-days-list/params-compensation-days-list.component';
import { ParamsCompensationDaysFormComponent } from './components/params-compensation-days-form/params-compensation-days-form.component';
import { ParamsCompensationDaysViewComponent } from './pages/params-compensation-days-view/params-compensation-days-view.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { paramscompensationDaysReducer } from './ngrx/params-compensation-days.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    ParamsCompensationDaysFilterComponent,
    ParamsCompensationDaysListComponent,
    ParamsCompensationDaysFormComponent,
    ParamsCompensationDaysViewComponent,
  ],
  imports: [
    CommonModule,
    ParamsCompensationDaysRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      'paramsCompensationDays',
      paramscompensationDaysReducer
    ),
  ],
  exports: [ParamsCompensationDaysFormComponent],
  entryComponents: [ParamsCompensationDaysFormComponent],
})
export class ParamsCompensationDaysModule {}
