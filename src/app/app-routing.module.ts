import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcgERP } from './dcg_erp/dcgERP';
import { DcgCommerce } from './pages/dcgCommerce/dcgCommerce';
import { DcgAI } from './pages/dcgAI/dcgAI';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  { path: 'app/dcgERP', component: DcgERP },
  { path: 'app/dcgCommerce', component: DcgCommerce },
  { path: 'app/dcgAI', component: DcgAI },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
