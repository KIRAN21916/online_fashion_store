import { CustomerService } from "../services/customer.service";
import { Customer } from "../services/customer";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  customers: Observable<Customer[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.customers = this.customerService.getAllCustomers();
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
