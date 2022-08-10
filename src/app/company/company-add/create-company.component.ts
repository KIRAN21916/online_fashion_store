import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';


import { Company } from '../services/company';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  

  company: Company = new Company();
  isUpdate = false;
  formData = new FormData();
  file: File;
  submitted = false;
  

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    console.log("I am here");

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("I am here company");
    if (id) {
      this.isUpdate = true;
      this.getCompany(id);
    }
  }

  getCompany(id): void {
    this.companyService.getCompany(id).subscribe(
      data => {
        console.log(data);
        this.company = data;
      },
      err => {
        console.log(err);
      }
    );

  }
 

  newCompany(): void {
    this.submitted = false;
    this.company = new Company();
  }

  // File Upload Logic
  fileChange(event) {
    console.log("Inside file upload")
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
        this.formData.append('company_image', this.file, this.file.name);
    }
}

  save() {    
    // Put company form in FormData
    for (let key in this.company) {
      console.log("Insie Iterator")
      this.formData.append(key, this.company[key]);
    }
   
    this.companyService.createCompany(this.formData).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.router.navigate(['/admin/company']);
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
      this.updateCompany();
    } else {
      this.submitted = true;
      this.save();
    }
    
  }

  updateCompany(): void {
    
    // Put company form in FormData ///
    for (let key in this.company) {
      console.log("Insie Iterator")
      this.formData.append(key, this.company[key]);
    }
    if(this.file) {
      console.log("I am here");
      // End of Request ///
      this.companyService.updateUploadCompany(this.company.company_id, this.formData).subscribe(
        data => {
          console.log(data);
          // this.isSuccessful = true;
          // this.isSignUpFailed = false;
          this.router.navigate(['/admin/company']);
        },
        err => {
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    } else {
      // End of Request ///
      this.companyService.updateCompany(this.company.company_id, this.company).subscribe(
        data => {
          console.log(data);
          // this.isSuccessful = true;
          // this.isSignUpFailed = false;
          this.router.navigate(['/admin/company']);
        },
        err => {
          // this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    }
    
  }
}
