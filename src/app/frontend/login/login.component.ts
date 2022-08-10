
import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/user/dashboard']);
    }
  }

  onSubmit(): void {
    this.authService.customerlogin(this.form).subscribe(
      data => {
        if(data != null) {
          console.log('login data: ', data);
          this.tokenStorage.saveToken("111");
          this.tokenStorage.saveUser(data);
          window.sessionStorage.user_level_id = 2;
          window.sessionStorage.user_id = data['customer_id']
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = "Invalid Email and Password. Kindly try again !!!!"
          this.isLoginFailed = true;
        }
       
        //this.reloadPage();
      },
      err => {
        console.log(err.error);
        this.errorMessage = "Invalid Email and Password. Kindly try again !!!!";//err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
