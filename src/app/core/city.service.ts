import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import cityMockData from './city-mock-data.json';
import { City } from './models';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { } 

 getCities (): Observable<City[]> {
   return of(cityMockData)
 }
}
