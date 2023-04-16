import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';

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
  loggedIn = false;
  canEdit = false;
  loginStatusSub: Subscription;
  constructor(public authService: AuthService) {
    this.loginStatusSub = this.authService.getAuthInfo().subscribe((status) => {
      this.loggedIn = status.loggedIn;
      this.canEdit = status.canEdit;
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
