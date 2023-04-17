import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CityListState, CITY_STATE } from './city.reducer';

export const cityListState = createFeatureSelector<CityListState>(CITY_STATE);

export const selectPageInfo = createSelector(
  cityListState,
  (state: CityListState) => state.pageInfo
);

export const selectIsLoading = createSelector(
  cityListState,
  (state: CityListState) => state.isLoading
);

export const selectCityList = createSelector(
  cityListState,
  (state: CityListState) => {
    return state.cityList;
  }
);
