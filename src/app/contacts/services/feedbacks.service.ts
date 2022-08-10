import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedbacks } from './feedbacks';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/feedback';

  constructor(private http: HttpClient) { }

  getFeedbacks(id: number): Observable<Feedbacks> {
    return this.http.get<Feedbacks>(`${this.baseUrl}/${id}`);
  }

  createFeedbacks(feedbacks: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, feedbacks);
  }

  updateFeedbacks(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateUploadFeedbacks(id: number, feedbacks: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, feedbacks);
  }

  deleteFeedbacks(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getFeedbacksList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-feedbacks/${id}`);
  }

  getAllFeedbacks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
