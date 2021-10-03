import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamsCompensationDaysViewComponent } from './pages/params-compensation-days-view/params-compensation-days-view.component';

const routes: Routes = [
  { path: '', component: ParamsCompensationDaysViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamsCompensationDaysRoutingModule {}
