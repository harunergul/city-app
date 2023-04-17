import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
@Injectable()
export class CommonRequestInterceptor implements HttpInterceptor {
  constructor(public configService: ConfigService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestInfo: any = {
      url: `${this.configService.BASE_URL}${request.url}`,
    };
    request = request.clone(requestInfo);
    return next.handle(request);
  }
}
