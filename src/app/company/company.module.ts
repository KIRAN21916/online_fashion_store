import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyComponent } from './company-add/create-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    CreateCompanyComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  bootstrap: [
    CompanyListComponent
  ]
})
export class CompanyModule { }
