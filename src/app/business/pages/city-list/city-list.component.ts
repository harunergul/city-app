import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CityService } from 'src/app/business/services/city.service';
import { City } from 'src/app/core/models';
import { PagedData } from 'src/app/core/models/page-vo';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  pageSizeOptions = [5, 10, 20, 25, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<City> = new MatTableDataSource<City>([]);

  constructor(private changeDetectorRef: ChangeDetectorRef, private cityService: CityService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<City>([]);
    this.cityService.getCities().subscribe((resp: PagedData<City[]>) => {
      this.dataSource.data = resp.data
    });
    this.dataSource.filterPredicate = this.filterBySubject();
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  filterBySubject() {
    let filterFunction =
      (data: City, filter: string): boolean => {

        if (filter) {
          if (data.name.toLowerCase().includes(filter.toLowerCase())) {
            return true;
          }
          return false;
        } else {
          return true;
        }
      };
    return filterFunction;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
