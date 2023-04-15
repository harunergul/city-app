import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from 'src/app/core/models/page-vo';
import { City } from '../../../core/models';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  getCities(filter: string, page: number, pageSize: number, ): Observable<PagedData<City[]>> {
    
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('filter', filter || "")
      
    return this.httpClient.get<PagedData<City[]>>("/cities", {
      params: params
    });
  }

  editCity(city: City): Observable<City> {
    return this.httpClient.put<City>("/cities/edit", city);
  }
}
