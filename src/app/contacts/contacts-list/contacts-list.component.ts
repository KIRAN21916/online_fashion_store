import { ContactsService } from "../services/contacts.service";
import { Contacts } from "../services/contacts";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-contacts-list",
  templateUrl: "./contacts-list.component.html",
  styleUrls: ["./contacts-list.component.css"]
})
export class ContactsListComponent implements OnInit {
  contacts: Observable<Contacts[]>;
  user_level_id = window.sessionStorage.user_level_id;

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.contacts = this.contactsService.getAllContacts();
  }

  public openNewTab(location) {
    window.open(location, '_blank');
  }

  deleteContacts(id: number) {
    this.contactsService.deleteContacts(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
