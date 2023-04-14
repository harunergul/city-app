import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './business/pages/city-list/city-list.component';
import { LoginComponent } from './business/pages/login/login.component';
import { LoginPageGuard } from './core/guards/login-page.guard';

const routes: Routes = [
  {path:'', component:CityListComponent},
  {path:'login', canActivate:[LoginPageGuard],  component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
