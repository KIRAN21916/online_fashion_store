import { ProductService } from "src/app/product/services/product.service"; 
import { CategoryService } from "src/app/category/services/category.service"; 
import { Category } from "src/app/category/services/category";
import { Product } from "src/app/product/services/product";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { Comments } from "src/app/product/services/comments";
import { DatePipe } from '@angular/common';
import { Sell } from "src/app/sell/services/sell";
import { SellService } from "src/app/sell/services/sell.service";
import { OrdersService } from "src/app/orders/services/orders.service";
import { Orders } from "src/app/orders/services/orders";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [DatePipe]
})
export class ProductDetailsComponent implements OnInit {
  id =""
  order_id = 0;
  user_level_id = window.sessionStorage.user_level_id;
  user_id = window.sessionStorage.user_id;
  product: Product = new Product();
  sellForm: Sell = new Sell();
  orderForm: Orders = new Orders();
  
  commentFrm: Comments = new Comments();
  category: Category = new Category();
  productList: Observable<Product[]>;
  categories: Observable<Category[]>;
  comments: Observable<any[]>;
  formData = new FormData();
  comment_date = new Date();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private sellService: SellService,
    private orderService: OrdersService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getProduct(this.id);
    } 
    this.getCategoryList();
    this.getProductList(0);
    this.getAllComments(this.id);
  }

  onSubmit() {
    this.commentFrm.comments_product_id = this.id;
    this.commentFrm.comments_user_id = window.sessionStorage.user_id;
    this.commentFrm.comments_date = this.datePipe.transform(this.comment_date, 'yyyy-MM-dd');
    this.save(); 
  }



  save() {    
    this.productService.saveComment(this.commentFrm).subscribe(
      data => {
        console.log(data);
        this.getAllComments(this.id);
        this.commentFrm.comments_title = "";
        this.commentFrm.comments_description = "";
        this.router.navigate(['/product-details/'+this.id]);
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  getProduct(id): void {
    this.productService.getProductDetails(id).subscribe(
      data => {
        console.log(data);
        this.product = data[0];
      },
      err => {
        console.log(err);
      }
    );

  }

  getAllComments(id) {
    this.comments = this.productService.getAllComments(id);
    console.log(this.comments)
  }

  getCategoryList() {
    this.categories = this.categoryService.getAllCategories();
  }

  getProductList(id) {
    this.productList = this.productService.getProductList(id);
  }

  addToCart() {
    console.log("User ID : "+this.user_id)
    if(this.user_id) {
      if(window.sessionStorage.order_id) {
       this.saveSells();
      } else {
        this.saveOrder();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  saveSells() {
    this.sellForm.sell_product_id = this.product.product_id;
    this.sellForm.sell_price_per_unit = this.product.product_cost;
    this.sellForm.sell_order_id = window.sessionStorage.order_id;
    this.sellForm.sell_units = 1
    this.sellForm.sell_total_cost = this.product.product_cost;
    this.addItem();
  }

  addItem(): void {
    console.log(this.sellForm);
    this.sellService.createSell(this.sellForm).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/product-cart']);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        // this.sellForm.sell_units = 0;
        // this.sellForm.sell_product_id = 0;
        // this.getOrderItems(this.order_id);
        
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  saveOrder(): void {
    let myDate = new Date();
    let todayDate = this.datePipe.transform(myDate, 'dd MMM yyyy hh:mm a');
    console.log("Date = "+todayDate);
    this.orderForm.order_date = todayDate;
    this.orderForm.order_customer_id = this.user_id;
    this.orderForm.order_total = 0;
    this.orderForm.order_status = "In Progress";
    this.addOrder();
      
  }

  addOrder(): void {
    this.orderService.createOrders(this.orderForm).subscribe(
      data => {
        console.log(data);
        window.sessionStorage.order_id = data['order_id'];
        console.log("Order ID : "+window.sessionStorage.order_id);
        this.saveSells();
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

}
