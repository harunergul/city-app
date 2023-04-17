import { createAction, props } from '@ngrx/store';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
}

export interface JwtContent {
  roles: string[];
  username: string;
  exp?: number;
  iat?: number;
}

export const loginRequest = createAction('[Auth] Login', props<AuthRequest>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<AuthResponse>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

// JWT Actions
export const setJWTContent = createAction(
  '[JWT Helper] Set Decoded JWT Content',
  props<JwtContent>()
);

export const DecodingJWTFailure = createAction(
  '[JWT Helper] Decoding JWT Failure',
  props<{ error: any }>()
);
