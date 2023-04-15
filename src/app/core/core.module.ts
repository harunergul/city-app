import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './auth/login/login.component';
import { AppCommonModule } from '../app-common.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AppCommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        skipWhenExpired: true,
      },
    }),
  ],
  exports: [LoginComponent],
})
export class CoreModule {}
