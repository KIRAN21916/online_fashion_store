import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/contact';

  constructor(private http: HttpClient) { }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  createContact(contact: Object): Observable<Object> {
    console.log(contact);

    return this.http.post(`${this.baseUrl}`, contact);
  }

  updateContact(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllContact(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
