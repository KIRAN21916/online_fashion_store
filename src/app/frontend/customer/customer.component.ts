
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { CustomerService } from "./services/customer.service";
import { TokenStorageService } from '../../services/token-storage.service';


import { Customer } from './services/customer';


import { Login } from './services/login';
import { LoginService } from './services/login.service';
import { RolesService } from 'src/app/roles/services/roles.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

 
  customer: Customer = new Customer();
  loginfrm: Login = new Login();
  user_level_id = window.sessionStorage.user_level_id;
  user_id = window.sessionStorage.user_id;
  submitted = false;
  isUpdate = false;
  msg = "";
  type= "danger";
  customer_id = "save"
  readonly = false;
  user = this.tokenStorageService.getUser();

  registrationMessage: string = ""

  @Output() messageEvent = new EventEmitter<string>();

 
  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
   
    if (this.user_id) {
      this.isUpdate = true;
      this.getCustomer(this.user_id);
    } else {
      this.loginfrm.login_level_id = "";
      this.customer.customer_department = "";
      this.customer.customer_sal = "";
      this.customer.customer_gender = "";
      this.customer.customer_state = "";
      this.customer.customer_country = "";
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
    // Check Login ID Exits
    this.loginService.checkUserNameExits(this.loginfrm.login_email).subscribe(
      (logindata:Login) => {
        if(typeof logindata[0] === 'object' && logindata[0].hasOwnProperty('login_email')) {
          console.log("Username Exits ")
          console.log(logindata);
          this.msg = "Error : Username already exits. Kindly choose another !!!"
        } else {
          // Saving Customer and Login Details
          this.customerService.createCustomer(this.customer).subscribe(
            data => {
              this.loginfrm.login_customer_id = data['customer_id'];
              // Saving Login Information 
              this.loginService.createLogin(this.loginfrm).subscribe(
                logindata => {
                  console.log("Loging Saved Data")
                  console.log(logindata);
              });
              this.registrationMessage = "Your account has registered successfully. Kindly login with your email and password !!!";
              this.messageEvent.emit(this.registrationMessage)
              this.router.navigate(['/login']);
            },
            err => {
              this.registrationMessage = err.error.message;
              // this.isSignUpFailed = true;
            }
          );
        }
    });
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.user_id) {
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
        if(this.user_level_id == "2") {
          this.msg = "Success : Your Account Updated Successfully !!!";
          this.type = "success";
          this.router.navigate(['/register']);
        }
      },
      err => {
        // this.registrationMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }


}
