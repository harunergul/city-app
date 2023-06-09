import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PageInfo } from 'src/app/core/models/page-vo'; 
import { CityDataSource } from './city-data-source';
import { CityListRequest } from '../../models';
import * as CityListActions from '../../states/city/city.actions';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent {
  displayedColumns = ['name'];
  pageSizeOptions = [5, 10, 20, 25, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: CityDataSource = new CityDataSource(this.store);

  pageInfo: PageInfo = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
  };

  filterContent = '';
  searchTextChanged = new Subject<string>();
  searchTextChangedSub: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource.loadCities({
      filter: this.filterContent,
      page: 0,
      pageSize: 5,
    });
    this.dataSource.pageInfo$.subscribe((pageInfo: PageInfo) => {
      this.pageInfo = pageInfo;
    });

    this.searchTextChangedSub = this.searchTextChanged
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.paginator.pageIndex = 0;
        this.loadCities();
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.searchTextChanged.next(filterValue);
  }

  loadCities() {
    this.filterContent, this.paginator.pageIndex, this.paginator.pageSize;
    let requestBody: CityListRequest = {
      filter: this.filterContent,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };
    this.dataSource.loadCities(requestBody);
  }

  cityUpdated($event) {
    this.loadCities();
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadCities())).subscribe();
  }

  ngOnDestroy() {
    if (this.searchTextChangedSub) {
      this.searchTextChangedSub.unsubscribe();
    }
  }
}
