
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CityService } from './core/city.service';
import { City } from './core/models';
import { AuthenticationService } from './core/services/authentication.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'city-app';

  isLoggedIn = false;
  loginStatusSub: Subscription;
  constructor(public authService: AuthenticationService) {

    this.loginStatusSub = this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    })
  }
  ngOnDestroy(): void {
    this.loginStatusSub || this.loginStatusSub.unsubscribe();
  }
}
