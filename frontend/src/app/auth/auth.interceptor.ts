import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userservice:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.userservice.currentUser
    if(user.token){
      // console.log(user.token);

      request = request.clone({
        setHeaders:{
          access_token :user.token
        }
      })
      // console.log(request);

    }
    return next.handle(request);
  }
}
