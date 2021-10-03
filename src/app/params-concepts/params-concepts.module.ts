import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParamsConceptsRoutingModule } from './params-concepts-routing.module';
import { ParamsConceptsFilterComponent } from './components/params-concepts-filter/params-concepts-filter.component';
import { ParamsConceptsListComponent } from './components/params-concepts-list/params-concepts-list.component';
import { ParamsConceptsViewComponent } from './pages/params-concepts-view/params-concepts-view.component';

import { paramsConceptsReducer } from './ngrx/params-concepts.reducer';

import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalFormParamsConceptsComponent } from './components/modal-form-params-concepts/modal-form-params-concepts.component';

@NgModule({
  declarations: [
    ParamsConceptsFilterComponent,
    ParamsConceptsListComponent,
    ParamsConceptsViewComponent,
    ModalFormParamsConceptsComponent,
  ],
  imports: [
    CommonModule,
    ParamsConceptsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('paramsConcepts', paramsConceptsReducer),
  ],
})
export class ParamsConceptsModule {}
