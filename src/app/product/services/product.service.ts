import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Comments } from './comments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/product';

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/product-details/${id}`);
  }

  createProduct(product: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, product);
  }

  saveComment(comment: Comments): Observable<Object> {
    return this.http.post(`http://127.0.0.1:8080/api/v1/comments`, comment);
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateUploadProduct(id: number, product: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  deleteComments(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8080/api/v1/comments/${id}`, { responseType: 'text' });
  }

  getProductList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-product/${id}`);
  }

  filterProductList(search: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-search/${search}`);
  }

  getCommentsList(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8080/api/v1/comments/all-users-comments/${id}`);
  }

  getAllProduct(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllComments(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8080/api/v1/comments/all-comments/${id}`);
  }
}
