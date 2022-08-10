import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellListComponent } from './sell-list/sell-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import {RouterModule} from '@angular/router';
 

@NgModule({
  declarations: [
    SellListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  bootstrap: [
    SellListComponent
  ]
})
export class SellModule { }
