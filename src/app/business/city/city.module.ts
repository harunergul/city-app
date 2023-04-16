import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityRoutingModule } from './city-routing.module';
import { CityCardComponent } from './components/city-card/city-card.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';

@NgModule({
  declarations: [CityListComponent, CityCardComponent, EditCityComponent],
  imports: [CommonModule, SharedModule, CityRoutingModule],
})
export class CityModule {}
