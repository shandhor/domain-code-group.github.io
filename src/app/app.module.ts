import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DcgERP } from './dcg_erp/dcgERP';
import { DcgCommerce } from './pages/dcgCommerce/dcgCommerce';
import { DcgAI } from './pages/dcgAI/dcgAI';
import { FaqComponent } from './pages/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    DcgERP,
    DcgCommerce,
    DcgAI,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
