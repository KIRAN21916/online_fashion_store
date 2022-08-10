import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';


import { Customer } from '../services/customer';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  
  customer: Customer = new Customer();
  user_level_id = window.sessionStorage.user_level_id;
  user_id = window.sessionStorage.user_id;
  submitted = false;
  isUpdate = false;
  msg = "";
  type= "danger";
  customer_id = "save"
  readonly = false;

  registrationMessage: string = ""

 
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
   
    if (id) {
      console.log("Here eee");
      this.isUpdate = true;
      this.getCustomer(id);
    } 
  }

  getCustomer(id): void {
    this.customerService.getCustomer(id).subscribe(
      data => {
        console.log(data);
        this.customer = data;
      },
      err => {
        console.log(err);
      }
    );

  }
  

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }

  save() {
    console.log("I am here");
          // Saving Customer and Login Details
          this.customerService.createCustomer(this.customer).subscribe(
            data => {
              this.registrationMessage = "Data Saved Successfully !!!";
              this.router.navigate(['/admin/customer']);
            },
            err => {
              this.registrationMessage = err.error.message;
              // this.isSignUpFailed = true;
            }
          );
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updateCustomer();
    } else {
      this.submitted = true;
      this.save();
    }
    
  }

  updateCustomer(): void {
    console.log(this.customer);
    this.customerService.updateCustomer(this.customer.customer_id, this.customer).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
          this.msg = "Success : Details updated successfully !!!";
          this.type = "success";
          this.router.navigate(['/admin/customer']);
      },
      err => {
        // this.registrationMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }
}
