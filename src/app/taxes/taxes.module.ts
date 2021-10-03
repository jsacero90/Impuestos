import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TaxesRoutingModule } from './taxes-routing.module';

import { TaxesDateFilterComponent } from './components/taxes-date-filter/taxes-date-filter.component';
import { TaxesDetailComponent } from './components/taxes-detail/taxes-detail.component';
import { TaxesPreviewMakeComponent } from './pages/taxes-preview-make/taxes-preview-make.component';
import { TaxesSumaryComponent } from './components/taxes-sumary/taxes-sumary.component';
import { taxesReducer } from './ngrx/taxes.reducer';

@NgModule({
  declarations: [
    TaxesPreviewMakeComponent,
    TaxesDateFilterComponent,
    TaxesSumaryComponent,
    TaxesDetailComponent,
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('taxes', taxesReducer),
    SharedModule,
  ],
})
export class TaxesModule {}
