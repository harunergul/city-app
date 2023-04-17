import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService
  ) {}

  onLoginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((authRequest: AuthActions.AuthRequest) =>
        this.authService.login(authRequest).pipe(
          map((response) => AuthActions.loginSuccess(response)),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  onLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap((authResponse: AuthActions.AuthResponse) =>
        this.authService.decodeJWT(authResponse.jwt).pipe(
          concatMap((resp) =>
            this.authService
              .decodeJWT(resp.jwt)
              .pipe(map((response) => AuthActions.setJWTContent(response)))
          ),
          concatMap((resp) =>
            of(resp).pipe(
              tap(() => {
                this.router.navigateByUrl('/');
              })
            )
          ),
          catchError((error) => of(AuthActions.DecodingJWTFailure(error)))
        )
      )
    )
  );
}
