import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, BaseHttpService } from '../../../core';
import { API_ENDPOINTS } from '../../../constants/app.constants';
import { Nokta, NoktaForm } from '../models/nokta';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoktaService extends BaseHttpService {
  getAll(search?: string): Observable<ApiResponse<Nokta[]>> {
    let params = new HttpParams();
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.get<ApiResponse<Nokta[]>>(API_ENDPOINTS.NOKTA.GET_ALL, params);
  }

  getAllById(personId: string): Observable<ApiResponse<Nokta[]>> {
    return this.get<ApiResponse<Nokta[]>>(API_ENDPOINTS.NOKTA.GET_ALL_BY_ID(personId));
  }

  create(form: NoktaForm): Observable<ApiResponse<Nokta>> {
    return this.post<ApiResponse<Nokta>>(API_ENDPOINTS.NOKTA.CREATE, form);
  }

  update(id: string, form: NoktaForm): Observable<ApiResponse<Nokta>> {
    return this.patch<ApiResponse<Nokta>>(API_ENDPOINTS.NOKTA.UPDATE(id), form);
  }

  remove(id: string): Observable<ApiResponse<Nokta>> {
    return this.delete<ApiResponse<Nokta>>(API_ENDPOINTS.NOKTA.DELETE(id));
  }
}
