import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , from} from 'rxjs';
import { map  } from 'rxjs/operators';
import { AuthInfo } from '../models/auth-info';
import { AuthRequest, AuthResponse } from '../models/auth-request';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authInfoSubject: BehaviorSubject<AuthInfo>;
  private authInfo$: Observable<AuthInfo>;

  constructor(private httpClient: HttpClient, private jwtHelper:JwtHelperService ) { 
    let initialAuthInfo:AuthInfo = { loggedIn: false, canEdit: false }
    initialAuthInfo = this.updateStates(initialAuthInfo);
    this.authInfoSubject = new BehaviorSubject(initialAuthInfo)
    this.authInfo$ = this.authInfoSubject.asObservable()
  }

  getAuthInfo(): Observable<AuthInfo> {
    return this.authInfo$;
  }
  getToken(): String {
    return localStorage.getItem("access_token")
  }

  isTokenExpired(){
    return this.jwtHelper.isTokenExpired()
  }

  logout(){
    localStorage.removeItem("access_token")
    let resetAutoInfo :AuthInfo = { loggedIn: false, canEdit: false }
    this.authInfoSubject.next(resetAutoInfo);
  }

  login(authRequest: AuthRequest): Observable<Boolean> {
    return this.httpClient.post<AuthResponse>("/api/auth/login", authRequest).pipe(map((response) => {
      let value = this.authInfoSubject.value;
      value.jwt = response.jwt;
      value.loggedIn = true;
      localStorage.setItem("access_token", value.jwt)

      value = this.updateStates(value);
      this.authInfoSubject.next(value);
      return true;
    }));

  }

  private updateStates(initialAuthInfo){
    
    if(this.getToken() && !this.isTokenExpired()){
      initialAuthInfo.loggedIn= true;
      const decodedToken = this.jwtHelper.decodeToken();
      if(decodedToken?.roles){
        let roles = decodedToken.roles
        initialAuthInfo.canEdit = roles.find(role => role==='ROLE_ALLOW_EDIT')
        initialAuthInfo.username = decodedToken.username;
      }
      
    }
    return initialAuthInfo;
  }
}
