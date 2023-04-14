import { Component, Input , OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { City } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EditCityComponent } from '../edit-city/edit-city.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnDestroy{

  @Input() city: City;

  canEdit = false;
  editSubscription : Subscription;
  constructor(private authService: AuthenticationService, public dialog: MatDialog) {
    this.editSubscription = this.authService.getAuthInfo().subscribe(loginStatus => {
      this.canEdit = loginStatus.canEdit
    })
  }

  
  openEditDialog(event:Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditCityComponent, {
      width:'800px',
      minWidth:'400px',
      data: {
        city: this.city
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.editSubscription || this.editSubscription.unsubscribe();
  }

  

}
