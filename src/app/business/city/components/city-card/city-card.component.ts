import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { City } from 'src/app/core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditCityComponent } from '../edit-city/edit-city.component';
import { selectAdminCanEdit } from 'src/app/core/states/auth/auth.selectors';
import { AuthState } from 'src/app/core/states/auth/auth.reducer';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent {
  @Input() city: City;
  @Output() cityUpdated = new EventEmitter();

  canEdit$ = this.store.select(selectAdminCanEdit);
  constructor(
    public dialog: MatDialog,
    private store: Store<AuthState>
  ) {}

  openEditDialog(event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditCityComponent, {
      width: '800px',
      minWidth: '400px',
      data: {
        city: this.city,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isSuccess) {
        this.cityUpdated.emit(result);
      }
    });
  }
}
