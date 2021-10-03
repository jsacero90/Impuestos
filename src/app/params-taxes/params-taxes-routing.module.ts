import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamsTaxesViewComponent } from './pages/params-taxes-view/params-taxes-view.component';

const routes: Routes = [{ path: '', component: ParamsTaxesViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamsTaxesRoutingModule {}
