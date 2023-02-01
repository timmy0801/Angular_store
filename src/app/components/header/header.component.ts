import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/card.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html' 
   
  
})
export class HeaderComponent {
  private _cart:Cart = {items:[]};
  itemsQuantity = 0;

  @Input()
  get cart():Cart{
    return this._cart;
  }
  set cart(cart:Cart){
    this._cart = cart;
    this.itemsQuantity = cart.items.map((item) =>item.quantity).reduce((prev,current)=>prev+current,0);
  }

  constructor(private cartservice:CartService) { }

  getTotal(items:Array<CartItem>):number{
    return this.cartservice.getTotal(items)
  }
  onClearCart(){
    this.cartservice.clearCart();
  }

}
