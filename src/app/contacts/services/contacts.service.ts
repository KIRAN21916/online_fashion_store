import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from './contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/contact';

  constructor(private http: HttpClient) { }

  getContacts(id: number): Observable<Contacts> {
    return this.http.get<Contacts>(`${this.baseUrl}/${id}`);
  }

  createContacts(contacts: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, contacts);
  }

  updateContacts(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateUploadContacts(id: number, contacts: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, contacts);
  }

  deleteContacts(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getContactsList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-contacts/${id}`);
  }

  getAllContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
