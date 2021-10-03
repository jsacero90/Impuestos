import { ParamsConceptsViewComponent } from './pages/params-concepts-view/params-concepts-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ParamsConceptsViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamsConceptsRoutingModule {}
