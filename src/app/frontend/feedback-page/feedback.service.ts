import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/feedback';

  constructor(private http: HttpClient) { }

  getFeedback(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.baseUrl}/${id}`);
  }

  createFeedback(feedback: Object): Observable<Object> {
    console.log(feedback);

    return this.http.post(`${this.baseUrl}`, feedback);
  }

  updateFeedback(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllFeedback(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
