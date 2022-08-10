
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLogin } from './user/user-login/user-login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { HomePageComponent } from './frontend/home-page/home-page.component';
import { AboutPageComponent } from './frontend/about-page/about-page.component';
import { ContactPageComponent } from './frontend/contact-page/contact-page.component';
import { CategoryComponent } from './frontend/category/category.component';
import { ProductListingComponent } from './frontend/product-listing/product-listing.component';
import { ProductDetailsComponent } from './frontend/product-details/product-details.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateCategoryComponent } from './category/category-add/create-category.component';
import { CreateProductComponent } from './product/product-add/create-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { LoginComponent } from './frontend/login/login.component';
import { CustomerComponent } from './frontend/customer/customer.component';
import { DashboardComponent } from './frontend/dashboard/dashboard.component';
import { CommentsComponent } from './frontend/comments/comments.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { FeedbacksListComponent } from './contacts/feedbacks-list/feedbacks-list.component';
import { FeedbackPageComponent } from './frontend/feedback-page/feedback-page.component';
import { CompanyComponent } from './frontend/company/company.component';
import { CreateCompanyComponent } from './company/company-add/create-company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CreateCustomerComponent } from './customer/customer-add/create-customer.component';
import { PaymentComponent } from './frontend/payment/payment.component';
import { OrderReportComponent } from './frontend/order-report/order-report.component';
import { ProductCartComponent } from './frontend/product-cart/product-cart.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { SellListComponent } from './sell/sell-list/sell-list.component';
import { OrderItemsComponent } from './frontend/order-items/order-items.component';



const routes: Routes = [
  // Site routes goes here 
  { 
    path: '', 
    component: LoginLayoutComponent ,
    children: [
      { path: 'admin/login', component: UserLogin },
      
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: CustomerComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'order-report', component: OrderReportComponent },
      { path: 'feedback', component: FeedbackPageComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'product', component: ProductListingComponent },
      { path: 'product/:id', component: ProductListingComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'order-items/:id', component: OrderItemsComponent },
      { path: 'product-cart', component: ProductCartComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-comments', component: CommentsComponent },
    ]
  },
  { 
    path: '', 
    component: PageLayoutComponent ,
    children: [
      
      { path: 'user/dashboard', component: UserDashboardComponent },
  
      { path: 'admin/company/add', component: CreateCompanyComponent },
      { path: 'admin/company', component: CompanyListComponent },
      { path: 'admin/company/update-company/:id', component: CreateCompanyComponent },


      { path: 'admin/customer', component: CustomerListComponent },
      { path: 'admin/customer/add', component: CreateCustomerComponent },
      { path: 'admin/customer/update-customer/:id', component: CreateCustomerComponent },

      { path: 'admin/category', component: CategoryListComponent },
      { path: 'admin/contact', component: ContactsListComponent },
      { path: 'admin/feedback', component: FeedbacksListComponent },
      { path: 'admin/category/add', component: CreateCategoryComponent },
      { path: 'admin/category/:id', component: CategoryListComponent },
      { path: 'admin/category/update-category/:id', component: CreateCategoryComponent },

      { path: 'admin/product', component: ProductListComponent },
      { path: 'admin/product/add', component: CreateProductComponent },
      { path: 'admin/product/:id', component: ProductListComponent },
      { path: 'admin/product/update-product/:id', component: CreateProductComponent },

      { path: 'admin/orders', component: OrdersListComponent },

      { path: 'admin/sells/:id', component: SellListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
