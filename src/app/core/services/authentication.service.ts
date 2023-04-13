import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInfo } from '../models/auth-info';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authInfoSubject: BehaviorSubject<AuthInfo> = new BehaviorSubject({isLoggedIn:true, canEdit:true})
  private authInfo$ = this.authInfoSubject.asObservable()

  constructor() { }

  getAuthInfo(): Observable<AuthInfo>{
    return this.authInfo$;
  }
  getToken(): String{
    return localStorage.getItem("TOKEN")
  }
}
