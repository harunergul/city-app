import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './auth/login/login.component';
import { AppCommonModule } from '../app-common.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthReducer } from './states/auth/auth.reducer';
import { AuthEffects } from './states/auth/auth.effects';
import { AUTH_STATE } from './states/auth/auth.reducer';
import { LocalStorageEffects } from './states/storage/storage.effects';

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
    StoreModule.forRoot({ [AUTH_STATE]: AuthReducer }),
    EffectsModule.forRoot([AuthEffects, LocalStorageEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  exports: [LoginComponent],
})
export class CoreModule {}
