import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sell } from './sell';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/sells';

  constructor(private http: HttpClient) { }

  getSell(id: number): Observable<Sell> {
    return this.http.get<Sell>(`${this.baseUrl}/${id}`);
  }

  createSell(sell: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, sell);
  }

  updateSell(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteSell(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSellList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-sells/${id}`);
  }
}
