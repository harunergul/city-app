import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/auth/login/login.component';

import { environment } from '../environments/environment'
import { APP_ENVIRONMENT } from './shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonRequestInterceptor } from './core/interceptors/common.interceptor';
import { CityModule } from './business/city/city.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    CityModule
  ],
  providers: [{provide: APP_ENVIRONMENT, useValue: environment}, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonRequestInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
