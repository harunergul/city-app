import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { loadStateFromLocalStorage } from './storage.action';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../auth/auth.actions';
import { JWTInvalidError } from '../../models/jwtinvalid-error';

@Injectable()
export class LocalStorageEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loadStateFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStateFromLocalStorage),
      map(() => {
        return localStorage.getItem('access_token');
      }),

      switchMap((token) =>
        this.authService.decodeJWT(token).pipe(
          concatMap((resp) => {
            if (resp == null) {
              throw new JWTInvalidError('JWT Token is can not be empty');
            }

            return this.authService
              .decodeJWT(resp.jwt)
              .pipe(map((response) => AuthActions.setJWTContent(response)));
          }),
          catchError((err) => {
            return of(AuthActions.DecodingJWTFailure({ error: err }));
          })
        )
      )
    )
  );
}
