import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { City } from 'src/app/core/models';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EditCityComponent } from '../edit-city/edit-city.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent {

  @Input() city: City;

  canEdit = false;
  constructor(private authService: AuthenticationService, public dialog: MatDialog) {
    this.authService.getAuthInfo().subscribe(loginStatus => {
      this.canEdit = loginStatus.canEdit
    })
  }

  
  openEditDialog(event:Event) {
    event.stopPropagation();
    console.log("open")
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

}
