import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/insterfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  constructor(private Http: HttpClient,private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.Http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
          this.toastrService.success(
            `welcom to foodmine ${user.name}`,
            'Login successful'
          )
        },
        error: (errorResponce) => {
            this.toastrService.error(errorResponce['error'],'Login failed')
        },
      })
    );
  }
  logOut(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }
  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  }
  private getUserFromLocalStorage():User{
   const userJson = localStorage.getItem(USER_KEY)
   if(userJson)return JSON.parse(userJson);
   return new User();
  }

}
