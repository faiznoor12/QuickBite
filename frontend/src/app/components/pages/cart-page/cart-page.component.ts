import { Component } from '@angular/core';
import { cart } from 'src/app/shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  val!:string
  cart!:cart
  constructor(private CartService:CartService){
    this.CartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    })
  }
  removeFromCart(CartItem:CartItem){
    this.CartService.removeFromCart(CartItem.food.id)
  }
  changeQuantity(cartItem:CartItem ,quantityInString:string){
    let quantity = parseInt(quantityInString)
    this.CartService.changeQuantity(cartItem.food.id, quantity)
  }
  changeQuntNum(symb:string,val:string){
    console.log(val);

    let value=parseInt(val)
    if(symb === '-')--value
    if(symb === '+')++value
  }

}
