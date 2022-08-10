
import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { TokenStorageService } from '../../services/token-storage.service';
import { Payment } from "./services/payment";
import { PaymentService } from "./services/payment.service";
import { DatePipe } from '@angular/common';
import { SellService } from "src/app/sell/services/sell.service";
import { OrdersService } from "src/app/orders/services/orders.service";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {
  
  @Input() orderForm: any = {};
  user_level_id = window.sessionStorage.user_level_id;
  user_id = window.sessionStorage.user_id;
  order_id = window.sessionStorage.order_id;
  submitted = false;
  isUpdate = false;
  msg = "";
  type= "danger";
  payment_id = "save"
  totalCost = 0;
  readonly = false;
  user = this.tokenStorageService.getUser();

  registrationMessage: string = ""


 
  constructor(
    private tokenStorageService: TokenStorageService,
    private orderService:OrdersService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private sellService: SellService,
  ) { }

  ngOnInit() {
    this.getTotalAmount();
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

  save(): void {
    let myDate = new Date();
    let todayDate = this.datePipe.transform(myDate, 'dd MMM yyyy hh:mm a');
    this.orderForm.order_total = this.totalCost;
    this.orderForm.order_customer_id = this.user_id;
    this.orderForm.order_status = "Paid";
    this.orderForm.order_id = this.order_id;
    this.orderForm.order_date = todayDate;

    this.orderService.updateOrders(this.order_id, this.orderForm).subscribe(
      data => {
        console.log("Order ID : ");
        console.log(data);
        this.router.navigate(['/order-items/'+this.order_id]);
        this.order_id = "";
        window.sessionStorage.order_id = "";
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  onSubmit() {
    this.save();    
  }
}
