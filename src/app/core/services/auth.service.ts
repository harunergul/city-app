import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthInfo } from '../models/auth-info';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from '../states/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { AuthRequest, AuthResponse } from '../states/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authInfoSubject: BehaviorSubject<AuthInfo>;
  private authInfo$: Observable<AuthInfo>;

  constructor(
    private store: Store<AuthState>,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    // this.isLoggedIn$ = this.store.select((state) => state.loggedIn);
    // this.username$ = this.store.select((state) => state.username);
    // this.error$ = this.store.select((state) => state.error);

    let initialAuthInfo: AuthInfo = { loggedIn: false, canEdit: false };
    initialAuthInfo = this.updateStates(initialAuthInfo);
    this.authInfoSubject = new BehaviorSubject(initialAuthInfo);
    this.authInfo$ = this.authInfoSubject.asObservable();
  }

  getAuthInfo(): Observable<AuthInfo> {
    return this.authInfo$;
  }
  getToken(): String {
    return localStorage.getItem('access_token');
  }

  isTokenExpired() {
    return this.jwtHelper.isTokenExpired();
  }

  logout() {
    localStorage.removeItem('access_token');
    let resetAutoInfo: AuthInfo = { loggedIn: false, canEdit: false };
    this.authInfoSubject.next(resetAutoInfo);
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>('/api/auth/login', authRequest)
      .pipe(
        map((response) => {
          // console.log(response);
          // let value = this.authInfoSubject.value;
          //value = this.updateStates(value);
          // this.authInfoSubject.next(value);
          return response;
        })
      );
  }

  private updateStates(initialAuthInfo) {
    if (this.getToken() && !this.isTokenExpired()) {
      initialAuthInfo.loggedIn = true;
      const decodedToken = this.jwtHelper.decodeToken();
      if (decodedToken?.roles) {
        let roles = decodedToken.roles;
        initialAuthInfo.canEdit = roles.find(
          (role) => role === 'ROLE_ALLOW_EDIT'
        );
        initialAuthInfo.username = decodedToken.username;
      }
    }
    return initialAuthInfo;
  }

  public decodeJWT(jwtData: string): Observable<any> {
    return of(this.jwtHelper.decodeToken(jwtData));
  }
}
