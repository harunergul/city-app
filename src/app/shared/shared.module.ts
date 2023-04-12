import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {  MatPaginatorModule} from '@angular/material/paginator';
let materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatPaginatorModule,
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [...materialModules]
})
export class SharedModule { }
