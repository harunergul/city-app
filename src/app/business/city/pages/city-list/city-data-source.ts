import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of, catchError, finalize } from 'rxjs';
import { City } from 'src/app/core/models';
import { PagedData, PageInfo } from 'src/app/core/models/page-vo';
import { CityService } from '../../services/city.service';

export class CityDataSource implements DataSource<City> {
  private citiesSubject = new BehaviorSubject<City[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private pageInfoSubject = new BehaviorSubject<PageInfo>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  });

  public loading$ = this.loadingSubject.asObservable();
  public pageInfo$ = this.pageInfoSubject.asObservable();

  constructor(private cityService: CityService) {}

  connect(collectionViewer: CollectionViewer): Observable<City[]> {
    return this.citiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.citiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCities(filter = '', page = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.cityService
      .getCities(filter, page, pageSize)
      .pipe(
        catchError(() =>
          of({
            data: [],
            pageInfo: { currentPage: 0, totalItems: 0, totalPages: 0 },
          })
        ),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((pagedResponse: PagedData<City[]>) => {
        this.pageInfoSubject.next(pagedResponse.pageInfo);
        this.citiesSubject.next(pagedResponse.data);
      });
  }
}
