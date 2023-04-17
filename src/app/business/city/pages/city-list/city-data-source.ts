import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { City } from 'src/app/core/models';
import { Store } from '@ngrx/store';
import { CityService } from '../../services/city.service';
import * as CityActions from '../../states/city/city.actions';
import * as CitySelectors from '../../states/city/city.selectors';
import { CityListRequest } from '../../models/city-list-request';
export class CityDataSource implements DataSource<City> {
  private citiesSubject = new BehaviorSubject<City[]>([]);

  public loading$ = this.store.select(CitySelectors.selectIsLoading);
  public pageInfo$ = this.store.select(CitySelectors.selectPageInfo);

  constructor(private cityService: CityService, private store: Store) {
    this.store
      .select(CitySelectors.selectCityList)
      .subscribe((cityList: City[]) => {
        this.citiesSubject.next(cityList);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<City[]> {
    return this.citiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.citiesSubject.complete();
  }

  loadCities(request: CityListRequest) {
    this.store.dispatch(CityActions.loadCities(request));
  }
}
