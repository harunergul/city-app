import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityCardComponent } from './business/components/city-card/city-card.component';
import { CityListComponent } from './business/pages/city-list/city-list.component';
import { LoginComponent } from './business/pages/login/login.component';
import { EditCityComponent } from './business/components/edit-city/edit-city.component';

import { environment } from '../environments/environment'
import { APP_ENVIRONMENT } from './shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityTokenInterceptor } from './core/interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CityCardComponent,
    CityListComponent,
    LoginComponent,
    EditCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: APP_ENVIRONMENT, useValue: environment}, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityTokenInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
