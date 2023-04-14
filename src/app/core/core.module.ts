import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt"; 

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        skipWhenExpired:true
      },
    }),


  ]
})
export class CoreModule { }
