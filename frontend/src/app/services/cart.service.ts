import { Injectable } from '@angular/core';
import { cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { food } from 'src/app/shared/models/food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart :cart = this.getCartFromLocalStorage()
  private cartSubect :BehaviorSubject<cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food:food){
let cartItem = this.cart.items.find( item => item.food.id  === food.id )
if ( cartItem ) return
this.cart.items.push(new CartItem(food))
this.setCartToLocalStorage()
  }
  removeFromCart(foodid:string){

   this.cart.items = this.cart.items.filter(item => item.food.id !== foodid)

    this.setCartToLocalStorage()
  }
  changeQuantity(foodid:string,quantity:number){
    let cartItem =this.cart.items.find(item=>item.food.id=== foodid)
    if(!cartItem)return
    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.food.price
    this.setCartToLocalStorage()
  }
  clearCart(){
    this.cart = new cart();
    this.setCartToLocalStorage()
  }
  getCartObservable():Observable<cart>{
    return this.cartSubect.asObservable()
  }
  private setCartToLocalStorage(){
    this.cart.totalPrice = this.cart.items.reduce((prevSum ,currentItem) => prevSum + currentItem.price , 0)
    this.cart.totalCount = this.cart.items.reduce((prevSum ,currentItem) => prevSum + currentItem.quantity , 0)
    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('cart',cartJson)
    this.cartSubect.next(this.cart)
  }
  private getCartFromLocalStorage():cart{
const cartJson = localStorage.getItem('cart')
return cartJson ? JSON.parse(cartJson) : new cart();
  }
}
