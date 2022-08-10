
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { OrdersService } from "src/app/orders/services/orders.service"; 
import { Orders } from "src/app/orders/services/orders"; 
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  orders: Observable<Orders[]>;
  user_level_id = window.sessionStorage.user_level_id;
  user_id = window.sessionStorage.user_id;

  constructor(private orderService: OrdersService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.orders = this.orderService.getCustomerOrders(this.user_id);
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }
}
