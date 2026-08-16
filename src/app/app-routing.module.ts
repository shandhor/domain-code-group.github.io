import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcgERP } from './dcg_erp/dcgERP';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  { path: 'app/dcgERP', component: DcgERP },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
