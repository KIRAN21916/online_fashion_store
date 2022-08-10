import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://127.0.0.1:8080/api/v1/companys';

  constructor(private http: HttpClient) { }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }

  createCompany(company: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, company);
  }

  updateCompany(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateUploadCompany(id: number, company: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, company);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCompanysList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-companys/${id}`);
  }

  getAllCompanys(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
