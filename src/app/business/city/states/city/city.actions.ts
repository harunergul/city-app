import { createAction, props } from '@ngrx/store';
import { City } from 'src/app/core/models';
import { PagedData } from 'src/app/core/models/page-vo';
import { CityListRequest } from '../../models/city-list-request';

export const loadCities = createAction(
  '[City List] Get paginated city list',
  props<CityListRequest>()
);

export const loadCitiesSuccess = createAction(
  '[City List] Loading city list successfully',
  props<PagedData<City[]>>()
);

export const loadCitiesFailure = createAction(
  '[City List] Loading city list failure',
  props<{ error: any }>()
);
