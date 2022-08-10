import { OrdersService } from "../services/orders.service";
import { Orders } from "../services/orders";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";


@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.css"]
})
export class OrdersListComponent implements OnInit {
  Orders: Observable<Orders[]>;

  constructor(private ordersService: OrdersService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
    console.log("I am here");
  }

  reloadData() {
    this.Orders = this.ordersService.getOrdersList(0);
  }

  deleteOrders(id: number) {
    this.ordersService.deleteOrders(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
