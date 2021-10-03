import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamsOfficeViewComponent } from './pages/params-office-view/params-office-view.component';

const routes: Routes = [{ path: '', component: ParamsOfficeViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamsOfficeRoutingModule {}
