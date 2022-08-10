import { SellService } from "../services/sell.service";
import { OrdersService } from "../../orders/services/orders.service";

import { Orders } from '../../orders/services/orders';
import { Sell } from "../services/sell";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";


@Component({
  selector: "app-sell-list",
  templateUrl: "./sell-list.component.html",
  styleUrls: ["./sell-list.component.css"]
})
export class SellListComponent implements OnInit {
  Sell: Observable<Sell[]>;
  orders: Orders = new Orders();

  constructor(
    private sellService: SellService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router) {}
    order_id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
   
    console.log("Getting Order ID "+this.order_id)
    this.getSellsData(this.order_id);
    this.getOrders(this.order_id);
    console.log("I am here");
  }

  getSellsData(order_id) {
    this.Sell = this.sellService.getSellList(order_id);
  }

  getOrders(id): void {
    this.ordersService.getOrderDetails(id).subscribe(
      data => {
        console.log(data);
        this.orders = data[0];
      },
      err => {
        console.log(err);
      }
    );

  }

}
