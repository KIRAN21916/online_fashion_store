import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/customers';

  constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, customer);
  }

  updateCustomer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateUploadCustomer(id: number, customer: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCustomersList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-customers/${id}`);
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
