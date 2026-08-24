import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected baseUrl = APP_CONSTANTS.API_BASE_URL;

  private readonly http = inject(HttpClient);

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params, withCredentials: true });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { withCredentials: true });
  }

  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, body, { withCredentials: true });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { withCredentials: true });
  }
}
