import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from './orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/orders';

  constructor(private http: HttpClient) { }

  getOrders(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.baseUrl}/${id}`);
  }

  getOrderDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/details/${id}`);
  }

  createOrders(orders: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, orders);
  }

  updateOrders(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteOrders(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOrdersList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-orders`);
  }

  getCustomerOrders(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer-orders/${id}`);
  }
}
