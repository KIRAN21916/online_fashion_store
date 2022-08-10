import { ProductService } from "../services/product.service";
import { Product } from "../services/product";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  product: Observable<Product[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.reloadData(id);
    } else {
      this.reloadData(0);
    }
  }

  reloadData(id) {
    this.product = this.productService.getProductList(id);
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData(0);
        },
        error => console.log(error));
  }
}
