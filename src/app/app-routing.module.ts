import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './business/pages/city-list/city-list.component';
import { LoginComponent } from './business/pages/login/login.component';

const routes: Routes = [
  {path:'', component:CityListComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
