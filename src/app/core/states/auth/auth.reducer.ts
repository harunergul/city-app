import { createReducer, on } from '@ngrx/store';
import { JWTInvalidError } from '../../models/jwtinvalid-error';

import * as AuthActions from './auth.actions';

export const AUTH_STATE = 'AUTH_STATE';

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

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginRequest, (state) => ({ ...state })),
  on(AuthActions.logout, (state) => {
    localStorage.removeItem("access_token");
    return { ...state, loggedIn: false, username:'',jwt:'',roles:[] }}
    
    ),
  on(AuthActions.loginSuccess, onLoginSucess),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.setJWTContent, (state, decodedJWT: AuthActions.JwtContent) => {
    state = {
      ...state,
      loggedIn: true,
      roles: decodedJWT.roles,
      username: decodedJWT.username,
    };
    return state;
  }),
  on(AuthActions.DecodingJWTFailure, (state, { error }) => {
    if (!(error instanceof JWTInvalidError)) {
      console.error('Fix this issue ');
      console.error('DecodingJWTFailure error-> ', error);
    }

    state = {
      ...state,
      loggedIn: false,
      roles: [],
      username: '',
    };

    return state;
  })
);
