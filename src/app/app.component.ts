import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from './core/states/auth/auth.reducer';
import { selectAdminCanEdit, selectIsLoggedIn } from './core/states/auth/auth.selectors';
import { loadStateFromLocalStorage } from './core/states/storage/storage.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .container {
        margin: auto;
        max-width: 700px;
      }

      .example-spacer {
        flex: 1 1 auto;
      }

      .login-icon {
        background: #a4c4fc;
        color: #4374e3;
        -webkit-border-radius: 50%;
        border-radius: 50%;
      }
    `,
  ],
})
export class AppComponent implements OnDestroy {
  title = 'city-app';


  
  loggedInUser = '';
  loggedIn$ = this.store.select(selectIsLoggedIn)
  canEdit$ = this.store.select(selectAdminCanEdit);
  loginStatusSub: Subscription;
  constructor(
    public authService: AuthService,
    private store: Store<AuthState>
  ) {

    this.store.dispatch(loadStateFromLocalStorage());
    
    this.loginStatusSub = this.authService.getAuthInfo().subscribe((status) => {
      this.loggedInUser = status.username;
    });
  }

  logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.loginStatusSub || this.loginStatusSub.unsubscribe();
  }
}
