import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from './payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/payments';

  constructor(private http: HttpClient) { }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`);
  }

  createPayment(payment: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, payment);
  }

  updatePayment(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPaymentsList(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-payment/${id}`);
  }

  getPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
