import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from '../states/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { AuthRequest, AuthResponse } from '../states/auth/auth.actions';
import * as AuthActions from '../states/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store<AuthState>,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  getToken(): String {
    return localStorage.getItem('access_token');
  }

  isTokenExpired() {
    return this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/api/auth/login', authRequest);
  }

  public decodeJWT(jwtData: string): Observable<any> {
    return of(this.jwtHelper.decodeToken(jwtData));
  }
}
