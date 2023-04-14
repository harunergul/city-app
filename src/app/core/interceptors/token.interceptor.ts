
import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class SecurityTokenInterceptor implements HttpInterceptor {
    constructor(public configService: ConfigService, private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestInfo: any = {

            url: `${this.configService.BASE_URL}${request.url}`
        }
        if (this.authService.getToken() !== null) {
            requestInfo.setHeaders = {
                Authorization: `Bearer ${this.authService.getToken()}`
            };
        }
        request = request.clone(requestInfo); return next.handle(request);
    }
}  