import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcgERP } from './dcg_erp/dcgERP';

const routes: Routes = [
  { path: 'app/dcgERP', component: DcgERP }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
