import { Injectable, Inject } from '@angular/core';
import { APP_ENVIRONMENT, Environment } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(APP_ENVIRONMENT) public appEnvironment: Environment) { }

  get BASE_URL(){
    return this.appEnvironment.BASE_URL;
  }
}
