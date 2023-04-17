import { state } from '@angular/animations';
import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import { City } from 'src/app/core/models';
import { PagedData, PageInfo } from 'src/app/core/models/page-vo';

import * as CityActions from './city.actions';

export const CITY_STATE = 'CITY_STATE';

export interface CityListState {
  cityList: City[];
  isLoading: boolean;
  pageInfo: PageInfo;
  error?: {
    errorCode: string;
    message: string;
  };
}

export const initialState: CityListState = {
  cityList: [],
  isLoading: false,
  pageInfo: {
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  error: {
    errorCode: '',
    message: '',
  },
};

export const CityListReducer = createReducer<CityListState>(
  initialState,
  on(CityActions.loadCities, (state: CityListState) => ({
    ...state,
    isLoading: true,
  })),
  on(CityActions.loadCitiesSuccess, (state, response: PagedData<City[]>) => {
    state = {...state, cityList:response.data, pageInfo: response.pageInfo, isLoading: false}
    return state;
  }),
  on(CityActions.loadCitiesFailure, (state, error) => {
    console.error('error', error);
    console.error('state', state);
    return state;
  })
);
