import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Comments } from "src/app/product/services/comments";
import { ProductService } from "src/app/product/services/product.service"; 
import { Observable } from "rxjs/internal/Observable";
import { Feedback } from "./feedback";
import { FeedbackService } from "./feedback.service";

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  msg = ""
  feedback: Feedback = new Feedback();
  isUpdate = false;
  formData = new FormData();
  file: File;
  submitted = false;
  

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.feedback.feedback_rating = "";
  }

  newFeedback(): void {
    this.submitted = false;
    this.feedback = new Feedback();
  }

  save() {    
    console.log(this.feedback);
   
    this.feedbackService.createFeedback(this.feedback).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.msg = "We have received your message. We will feedback you soon !!!"
        this.newFeedback();
        this.router.navigate(['/feedback']);
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
