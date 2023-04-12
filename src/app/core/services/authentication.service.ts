import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedInSubject = new BehaviorSubject(false)
  private loginStatus$ = this.isLoggedInSubject.asObservable()

  constructor() { }

  getLoginStatus(): Observable<boolean>{
    return this.loginStatus$;
  }
}
