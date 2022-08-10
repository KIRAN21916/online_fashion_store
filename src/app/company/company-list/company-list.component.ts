import { CompanyService } from "../services/company.service";
import { Company } from "../services/company";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.css"]
})
export class CompanyListComponent implements OnInit {
  companys: Observable<Company[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.companys = this.companyService.getAllCompanys();
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
