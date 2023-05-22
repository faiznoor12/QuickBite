import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
cartQuntity = 0
user!:User
constructor(CartService:CartService,private userService:UserService){
  CartService.getCartObservable().subscribe((newCart)=>{
    this.cartQuntity = newCart.totalCount
  })
  userService.userObservable.subscribe((newUser)=>{
this.user = newUser
  })
}
logOut(){
  this.userService.logOut()
}
get isAuth(){
return this.user.token
}

}
