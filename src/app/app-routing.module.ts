import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'administrar',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { titulo: 'Administrar' },
  },
  {
    path: 'administrar/dias-compensacion',
    loadChildren: () =>
      import('./params-compensation-days/params-compensation-days.module').then(
        (m) => m.ParamsCompensationDaysModule
      ),
    data: { titulo: 'administrar/dias-compensacion' },
  },
  {
    path: 'administrar/oficinas',
    loadChildren: () =>
      import('./params-office/params-office.module').then(
        (m) => m.ParamsOfficeModule
      ),
    data: { titulo: 'administrar/oficinas' },
  },
  {
    path: 'administrar/impuestos',
    loadChildren: () =>
      import('./params-taxes/params-taxes.module').then(
        (m) => m.ParamsTaxesModule
      ),
    data: { titulo: 'administrar/impuestos' },
  },
  {
    path: 'administrar/conceptos',
    loadChildren: () =>
      import('./params-concepts/params-concepts.module').then(
        (m) => m.ParamsConceptsModule
      ),
    data: { titulo: 'administrar/conceptos' },
  },
  {
    path: 'reports/reporte-consolidado',
    loadChildren: () =>
      import('./taxes/taxes.module').then((m) => m.TaxesModule),
    data: { titulo: 'reporte-consolidado' },
  },
  {
    path: 'administrar',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { titulo: 'Administrar' },
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
