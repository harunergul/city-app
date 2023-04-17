import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CityListRequest } from '../../models';
import { CityService } from '../../services';
import * as CityActions from './city.actions';

@Injectable()
export class CityListEffects {
  constructor(private actions$: Actions, private cityService: CityService) {}

  onLoadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCities),
      switchMap((reqBody: CityListRequest) =>
        this.cityService.getCities(reqBody).pipe(
          map((response) => CityActions.loadCitiesSuccess(response)),
          catchError((error) => of(CityActions.loadCitiesFailure({ error })))
        )
      )
    )
  );
}
