import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserModule } from './user/user.module'

import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { RolesModule } from './roles/roles.module';
import { FrontendModule } from './frontend/frontend.module';
import { CategoryModule } from './category/category.module';
import { ContactsModule } from './contacts/contacts.module';
import { ProductModule } from './product/product.module'; 
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { SellModule } from './sell/sell.module';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    PageLayoutComponent,
    HeaderComponent,
    SidebarComponent

  ],
  imports: [
    BrowserModule,
    CustomerModule,
    CompanyModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    LayoutsModule,
    RolesModule,
    FrontendModule,
    CategoryModule,
    ProductModule,
    ContactsModule,
    SellModule,
    OrdersModule
  ],

  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
