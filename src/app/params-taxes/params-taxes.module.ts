import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParamsTaxesRoutingModule } from './params-taxes-routing.module';
import { ParamsTaxesFilterComponent } from './components/params-taxes-filter/params-taxes-filter.component';
import { ParamsTaxesListComponent } from './components/params-taxes-list/params-taxes-list.component';
import { ParamsTaxesViewComponent } from './pages/params-taxes-view/params-taxes-view.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { paramsTaxesReducer } from './ngrx/params-taxes.reducer';
import { StoreModule } from '@ngrx/store';
import { ModalFormParamsTaxesComponent } from './components/modal-form-params-taxes/modal-form-params-taxes.component';

@NgModule({
  declarations: [
    ParamsTaxesFilterComponent,
    ParamsTaxesListComponent,
    ParamsTaxesViewComponent,
    ModalFormParamsTaxesComponent,
  ],
  imports: [
    CommonModule,
    ParamsTaxesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('paramsTaxes', paramsTaxesReducer),
  ],
})
export class ParamsTaxesModule {}
