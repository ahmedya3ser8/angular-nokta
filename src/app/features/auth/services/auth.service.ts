import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { API_ENDPOINTS } from '../../../constants/app.constants';
import { ApiResponse, BaseHttpService } from '../../../core';
import { SigninForm, SignupForm, User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {
  private readonly _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();

  readonly isAuthenticated = computed(() => !!this._user());

  signup(form: SignupForm): Observable<ApiResponse<User>> {
    return this.post<ApiResponse<User>>(API_ENDPOINTS.AUTH.SIGNUP, form).pipe(
      tap(res => {
        this._user.set(res.data);
      })
    );
  }

  signin(form: SigninForm): Observable<ApiResponse<User>> {
    return this.post<ApiResponse<User>>(API_ENDPOINTS.AUTH.SIGNIN, form).pipe(
      tap(res => {
        this._user.set(res.data);
      })
    );
  }

  logout(): Observable<ApiResponse<User>> {
    return this.post<ApiResponse<User>>(API_ENDPOINTS.AUTH.LOGOUT, {}).pipe(
      tap(() => {
        this._user.set(null);
      })
    );;
  }

  getUserData(): Observable<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.GET_ME).pipe(
      tap(res => {
        this._user.set(res.data);
      })
    );
  }
}
