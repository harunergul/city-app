import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { LoginPageGuard } from './core/guards/login-page.guard';

const routes: Routes = [
  {path: '',   redirectTo: '/city' , pathMatch: 'full'},
  {path:'login', canActivate:[LoginPageGuard],  component:LoginComponent},
  {path:'city',  loadChildren: () => import('./business/city/city.module').then(m => m.CityModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
