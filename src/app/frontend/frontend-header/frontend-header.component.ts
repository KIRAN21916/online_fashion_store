import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit {

  userDetails = "";
  user_level_id = "";
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.user_level_id = window.sessionStorage.user_level_id;
    console.log("Login User Details");
    console.log(this.userDetails)
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
