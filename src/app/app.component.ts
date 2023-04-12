
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CityService } from './core/city.service';
import { City } from './core/models';


 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'city-app';

  pageSizeOptions = [5, 10, 20, 25, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<City> = new MatTableDataSource<City>([]);

  constructor(private changeDetectorRef: ChangeDetectorRef, private cityService: CityService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<City>([]);
    this.cityService.getCities().subscribe((data)=>{
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
