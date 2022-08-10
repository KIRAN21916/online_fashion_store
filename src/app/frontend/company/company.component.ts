import { CompanyService } from "src/app/company/services/company.service"; 
import { Company } from "src/app/company/services/company";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  categories: Observable<Company[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categories = this.companyService.getAllCompanys();
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
