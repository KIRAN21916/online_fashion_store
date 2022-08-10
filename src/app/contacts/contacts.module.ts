import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { RouterModule } from '@angular/router';
import { FeedbacksListComponent } from './feedbacks-list/feedbacks-list.component';


@NgModule({
  declarations: [
    FeedbacksListComponent,
    ContactsListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  bootstrap: [
    ContactsListComponent
  ]
})
export class ContactsModule { }
