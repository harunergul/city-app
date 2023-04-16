import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface AuthState {
  jwt: string;
  loggedIn: boolean;
  username: string;
  roles: string[];
}

export const initialState: AuthState = {
  jwt: '',
  loggedIn: false,
  username: '',
  roles: [],
};

const onLoginSucess = (state, response: AuthActions.AuthResponse) => {
  state = { ...state, loggedIn: true, jwt: response.jwt };
  localStorage.setItem('access_token', state.jwt);
  return state;
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginRequest, (state) => ({ ...state })),
  on(AuthActions.logout, (state) => ({ ...state, loggedIn: false })),
  on(AuthActions.loginSuccess, onLoginSucess),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.setDecodedJWTContent, (state, decodedJWT: AuthActions.JwtTokenContent) => {
    state = {
      ...state,
      roles: decodedJWT.roles,
      username: decodedJWT.username,
    };
    console.log("state being setted")
    return state;
  }),
  on(AuthActions.DecodingJWTFailure, (state, { error }) => {
    console.log("error", error);
    return state;
  }),
);
