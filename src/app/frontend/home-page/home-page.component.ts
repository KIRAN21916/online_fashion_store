import { CategoryService } from "src/app/category/services/category.service"; 
import { Category } from "src/app/category/services/category";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories: Observable<Category[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categories = this.categoryService.getAllCategories();
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }
}
