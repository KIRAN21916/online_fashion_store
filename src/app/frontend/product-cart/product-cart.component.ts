import { ProductService } from "src/app/product/services/product.service"; 
import { CategoryService } from "src/app/category/services/category.service"; 
import { Category } from "src/app/category/services/category";
import { Product } from "src/app/product/services/product";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { Comments } from "src/app/product/services/comments";
import { DatePipe } from '@angular/common';
import { Orders } from "src/app/orders/services/orders";
import { Sell } from "src/app/sell/services/sell";
import { SellService } from "src/app/sell/services/sell.service";
import { OrdersService } from "src/app/orders/services/orders.service";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
  providers: [DatePipe]
})
export class ProductCartComponent implements OnInit {
  id =""
  totalCost = 0;
  user_level_id = window.sessionStorage.user_level_id;
  order_id = window.sessionStorage.order_id;
  errorMessage = '';

  Sell: Observable<Sell[]>;
  orders: Orders = new Orders();

  constructor(
    private sellService: SellService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router) {}

  ngOnInit() {
    console.log("Getting Order ID "+this.order_id)
    this.getSellsData(this.order_id);
    this.getTotalAmount();
    console.log("I am here");
  }

  getSellsData(order_id) {
    this.sellService.getSellList(order_id)
      .subscribe(
        data => {
          console.log(data);
          this.Sell = data;
        },
        error => console.log(error));
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

  getTotalAmount() {
    this.sellService.getSellList(this.order_id)
    .subscribe(
      data => {
        data.forEach( (element) => {
          this.totalCost+=Number(element.sell_total_cost);
        });
      },
      error => console.log(error));
  }


  delete(id: number): void {
    this.sellService.deleteSell(id).subscribe(
      data => {
        console.log(data);
        this.getSellsData(this.order_id);
        this.getTotalAmount();
        this.errorMessage = "Items deleted from cart successfully !!!"
      },
      err => {
        console.log(err);
      }
    );
  }

  continueShopping() {
    this.router.navigate(['/product']);
  }

  payment() {
    this.router.navigate(['/payment']);
  }

}
