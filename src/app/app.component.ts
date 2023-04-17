import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from './core/states/auth/auth.reducer';
import * as AuthSelector from './core/states/auth/auth.selectors';
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
export class AppComponent {
  appTitle = 'City App';
  loggedInUser$ = this.store.select(AuthSelector.selectUsername);
  loggedIn$ = this.store.select(AuthSelector.selectIsLoggedIn);
  canEdit$ = this.store.select(AuthSelector.selectAdminCanEdit);
  constructor(
    public authService: AuthService,
    private store: Store<AuthState>
  ) {
    this.store.dispatch(loadStateFromLocalStorage());
  }

  logout() {
    this.authService.logout();
  }
}
