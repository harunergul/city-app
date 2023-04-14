
import { Component,  OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './core/services/authentication.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'city-app';

  loggedIn = false;
  canEdit = false;
  loginStatusSub: Subscription;
  constructor(public authService: AuthenticationService) {

    this.loginStatusSub = this.authService.getAuthInfo().subscribe(status => {
      this.loggedIn = status.loggedIn;
      this.canEdit = status.canEdit;
    })
  }

  logout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.loginStatusSub || this.loginStatusSub.unsubscribe();
  }
}
