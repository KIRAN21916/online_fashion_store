import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './category-add/create-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    CreateCategoryComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  bootstrap: [
    CategoryListComponent
  ]
})
export class CategoryModule { }
