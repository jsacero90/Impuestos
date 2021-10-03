import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';

import { ModalFormReportsComponent } from './components/modal-form-reports/modal-form-reports.component';
import { ReportsComponent } from './pages/reports/reports.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [ReportsComponent, ModalFormReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ReportsModule {}
