import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PageInfo } from 'src/app/core/models/page-vo';
import { CityService } from '../../services/city.service';
import { CityDataSource } from './city-data-source';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent {
  displayedColumns = ['name'];
  pageSizeOptions = [5, 10, 20, 25, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: CityDataSource;

  pageInfo: PageInfo = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
  };

  filterContent = '';
  searchTextChanged = new Subject<string>();
  searchTextChangedSub: Subscription;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.dataSource = new CityDataSource(this.cityService);
    this.dataSource.loadCities();
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
    this.dataSource.loadCities(
      this.filterContent,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
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
