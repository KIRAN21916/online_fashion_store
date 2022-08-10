import { FeedbacksService } from "../services/feedbacks.service";
import { Feedbacks } from "../services/feedbacks";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-feedbacks-list",
  templateUrl: "./feedbacks-list.component.html",
  styleUrls: ["./feedbacks-list.component.css"]
})
export class FeedbacksListComponent implements OnInit {
  feedbacks: Observable<Feedbacks[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private feedbacksService: FeedbacksService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.feedbacks = this.feedbacksService.getAllFeedbacks();
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }

  deleteFeedbacks(id: number) {
    this.feedbacksService.deleteFeedbacks(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
