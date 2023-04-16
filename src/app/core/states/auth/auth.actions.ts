import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const STATE_AUTH = "APPAUTHSTATE";
export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
}

export interface JwtTokenContent{
  roles: string[],
  username: string,
  exp?: number,
  iat?: number
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
export const setDecodedJWTContent = createAction(
  '[JWT Helper] Set Decoded JWT Content',
  props<JwtTokenContent>()
  // props<{ jwtDecoded: any }>()
  // (decodedToken: string) => ({ decodedToken })
);


export const DecodingJWTFailure = createAction(
  '[JWT Helper] Decoding JWT Failure',
  props<{ error: any }>()
  // props<{ jwtDecoded: any }>()
  // (decodedToken: string) => ({ decodedToken })
);


export const navigateTo = createAction(
  '[Router] Navigate To',
  props<{ route: any[]; extras?: NavigationExtras }>()
);

// EXPORT CONST JWTDECODED = CREATEACTION(
//   '[JWT HELPER] JWT DECODED',
//   //(DECODEDJWT:STRING)=>({DECODEDJWT})
//   PROPS<DECODEDTOKEN>()
// );

// export const jwtDecodeFailure = createAction('[JWT Helper] JWT Decode Failure');
