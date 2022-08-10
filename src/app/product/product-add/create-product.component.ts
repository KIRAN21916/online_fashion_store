import { ProductService } from '../services/product.service';
import { CategoryService } from '../../category/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';


import { Product } from '../services/product';
import { Category } from '../../category/services/category';



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  

  product: Product = new Product();
  category: Category = new Category();
  submitted = false;
  isUpdate = false;
  formData = new FormData();
  file: File;
  

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    console.log("I am here");

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("I am here product");
    if (id) {
      this.isUpdate = true;
      this.getProduct(id);
    } else {
      this.product.product_category_id = "0";
    }
    this.getCategoryOption();
  }

  getProduct(id): void {
    this.productService.getProduct(id).subscribe(
      data => {
        console.log(data);
        this.product = data;
      },
      err => {
        console.log(err);
      }
    );

  }
  
  getCategoryOption(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.category = data;
      },
      err => {
        console.log(err);
      }
    );
  }
 

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  // File Upload Logic
  fileChange(event) {
    console.log("Inside file upload")
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
        this.formData.append('product_image', this.file, this.file.name);
    }
}

  save() {    
    // Put product form in FormData
    for (let key in this.product) {
      console.log("Insie Iterator")
      this.formData.append(key, this.product[key]);
    }
   
    this.productService.createProduct(this.formData).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.router.navigate(['/admin/product']);
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updateProduct();
    } else {
      this.submitted = true;
      this.save();
    }
    
  }

  updateProduct(): void {
    
    // Put product form in FormData ///
    for (let key in this.product) {
      console.log("Insie Iterator")
      this.formData.append(key, this.product[key]);
    }
    if(this.file) {
      console.log("I am here");
      // End of Request ///
      this.productService.updateUploadProduct(this.product.product_id, this.formData).subscribe(
        data => {
          console.log(data);
          // this.isSuccessful = true;
          // this.isSignUpFailed = false;
          this.router.navigate(['/admin/product']);
        },
        err => {
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    } else {
      // End of Request ///
      this.productService.updateProduct(this.product.product_id, this.product).subscribe(
        data => {
          console.log(data);
          // this.isSuccessful = true;
          // this.isSignUpFailed = false;
          this.router.navigate(['/admin/product']);
        },
        err => {
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    }
    
  }
}
