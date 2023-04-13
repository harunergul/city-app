import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from 'src/app/core/models/page-vo';
import { City } from '../../core/models';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  getCities(): Observable<PagedData<City[]>> {
    return this.httpClient.get<PagedData<City[]>>("/cities")
  }
}
