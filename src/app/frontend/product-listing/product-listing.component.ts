import { ProductService } from "src/app/product/services/product.service"; 
import { CategoryService } from "src/app/category/services/category.service"; 
import { Category } from "src/app/category/services/category";
import { Product } from "src/app/product/services/product";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  product: Observable<Product[]>;
  search_text = "";
  categories: Observable<Category[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.reloadData(id);
    } else {
      this.reloadData(0);
    }
    this.getCategoryList();
  }

  reloadData(id) {
    this.product = this.productService.getProductList(id);
  }
  

  public openNewTab(location) {
    window.open(location, '_blank');
  }

  searchProduct() {
    if(this.search_text == "") {
      this.product = this.productService.filterProductList("0");
    } else {
      this.product = this.productService.filterProductList(this.search_text);
    }    
  }

  resetSearch() {
    this.product = this.productService.filterProductList("0");
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

  getCategoryList() {
    this.categories = this.categoryService.getAllCategories();
  }

}
