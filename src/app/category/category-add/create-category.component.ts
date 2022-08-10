import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';


import { Category } from '../services/category';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  

  category: Category = new Category();
  isUpdate = false;
  formData = new FormData();
  file: File;
  submitted = false;
  

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    console.log("I am here");

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("I am here category");
    if (id) {
      this.isUpdate = true;
      this.getCategory(id);
    }
  }

  getCategory(id): void {
    this.categoryService.getCategory(id).subscribe(
      data => {
        console.log(data);
        this.category = data;
      },
      err => {
        console.log(err);
      }
    );

  }
 

  newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }

  // File Upload Logic
  fileChange(event) {
    console.log("Inside file upload")
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
        this.formData.append('category_image', this.file, this.file.name);
    }
}

  save() {    
    // Put category form in FormData
    for (let key in this.category) {
      console.log("Insie Iterator")
      this.formData.append(key, this.category[key]);
    }
   
    this.categoryService.createCategory(this.formData).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.router.navigate(['/admin/category']);
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
      this.updateCategory();
    } else {
      this.submitted = true;
      this.save();
    }
    
  }

  updateCategory(): void {
    
    // Put category form in FormData ///
    for (let key in this.category) {
      console.log("Insie Iterator")
      this.formData.append(key, this.category[key]);
    }
    if(this.file) {
      console.log("I am here");
      // End of Request ///
      this.categoryService.updateUploadCategory(this.category.category_id, this.formData).subscribe(
        data => {
          console.log(data);
          // this.isSuccessful = true;
          // this.isSignUpFailed = false;
          this.router.navigate(['/admin/category']);
        },
        err => {
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    } else {
      // End of Request ///
      this.categoryService.updateCategory(this.category.category_id, this.category).subscribe(
        data => {
          console.log(data);
          // this.isSuccessful = true;
          // this.isSignUpFailed = false;
          this.router.navigate(['/admin/category']);
        },
        err => {
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    }
    
  }
}
