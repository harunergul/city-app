import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CityService } from 'src/app/core/city.service';
import { City } from 'src/app/core/models';

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
    this.cityService.getCities().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
