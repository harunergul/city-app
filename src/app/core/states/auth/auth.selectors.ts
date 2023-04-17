import { createSelector } from '@ngrx/store';
import { AuthState, AUTH_STATE } from './auth.reducer';

export const authStateFull = (state: AuthState ) => state[AUTH_STATE];

export const selectIsLoggedIn = createSelector(
  authStateFull,
  (state) => state.loggedIn
);

export const selectAdminCanEdit = createSelector(
  authStateFull,
  (state: AuthState) =>{
    if(state?.roles){
      return state.roles.indexOf('ROLE_ALLOW_EDIT')!=-1;
    }
    return false;
  } 
);

export const selectUsername = createSelector(
  authStateFull,
  (state) => state.username
);

export const selectLoginError = createSelector(
  authStateFull,
  (state:AuthState) => state.error
);

export const selectRoles = createSelector(
  authStateFull,
  (state) => state.roles
);


 