import { Component, Input } from '@angular/core';
import { City } from 'src/app/core/models';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent {

  @Input() city: City;

}
