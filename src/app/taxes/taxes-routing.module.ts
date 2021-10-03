import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxesPreviewMakeComponent } from './pages/taxes-preview-make/taxes-preview-make.component';

const routes: Routes = [{ path: '', component: TaxesPreviewMakeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxesRoutingModule {}
