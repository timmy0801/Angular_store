import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from './models/card.model';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  cart: Cart ={items:[]};
  constructor(private cartService:CartService){}

  ngOnInit(){
    this.cartService.cart.subscribe((_cart)=>{
      this.cart = _cart;
    });
  }
}
