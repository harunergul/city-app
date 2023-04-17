import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityRoutingModule } from './city-routing.module';
import { CityCardComponent } from './components/city-card/city-card.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';
import { CITY_STATE, CityListReducer } from './states/city/city.reducer';
import { CityListEffects } from './states/city/city.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [CityListComponent, CityCardComponent, EditCityComponent],
  imports: [
    CommonModule,
    SharedModule,
    CityRoutingModule,
    StoreModule.forFeature(CITY_STATE, CityListReducer),
    EffectsModule.forFeature([CityListEffects]),
  ],
})
export class CityModule {}
