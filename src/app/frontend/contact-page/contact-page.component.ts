import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Comments } from "src/app/product/services/comments";
import { ProductService } from "src/app/product/services/product.service"; 
import { Observable } from "rxjs/internal/Observable";
import { Contact } from "./contact";
import { ContactService } from "./contact.service";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  msg = ""
  contact: Contact = new Contact();
  isUpdate = false;
  formData = new FormData();
  file: File;
  submitted = false;
  

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    
  }

  newContact(): void {
    this.submitted = false;
    this.contact = new Contact();
  }

  save() {    
    console.log(this.contact);
   
    this.contactService.createContact(this.contact).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.msg = "We have received your message. We will contact you soon !!!"
        this.newContact();
        this.router.navigate(['/contact']);
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.submitted = true;
    this.save();
  }
}
