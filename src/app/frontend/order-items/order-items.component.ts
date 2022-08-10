
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { OrdersService } from "src/app/orders/services/orders.service"; 
import { Orders } from "src/app/orders/services/orders"; 
import { TokenStorageService } from '../../services/token-storage.service';
import { SellService } from "src/app/sell/services/sell.service";
import { Sell } from "src/app/sell/services/sell";


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
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
