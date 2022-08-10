
import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  user_level_id = window.sessionStorage.user_level_id;
  user_id = window.sessionStorage.user_id;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router) {}

  ngOnInit() {
   
   
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
  }
}
