import { Cart, CartItem } from 'src/app/models/card.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackBar:MatSnackBar) { }

  addToCart(item:CartItem):void{
    const items =[...this.cart.value.items];
    const itemIncart = items.find((_item)=>_item.id === item.id);
    if(itemIncart){
      itemIncart.quantity += 1;
    }else{
      items.push(item)
    }

    this.cart.next({items});
    this._snackBar.open('您的商品已增加至購物車','完成',{duration:3000})
    console.log(this.cart.value)
  }

  getTotal(items:Array<CartItem>):number{
    return items.
      map((item) => item.price *item.quantity)
        .reduce((prev,current)=>prev+current,0)
  }
  clearCart():void{
    this.cart.next({items:[]});
    this._snackBar.open('購物車已清空','完成',{duration:3000});
  }

  removeFromCart(item: CartItem,update =true):Array<CartItem>{
    const filterItems = this.cart.value.items.filter((_item)=> _item.id !== item.id);

    if(update){
      this.cart.next({items:filterItems});
      this._snackBar.open('商品已從購物車移除','完成',{duration:3000})
    }
    return filterItems
  }

  removeQuantity(item:CartItem):void{
    let itemForRemoval: CartItem | undefined;
    let filterItems = this.cart.value.items.map((_item) => {
      if(_item.id === item.id){
        _item.quantity--;

        if(_item.quantity === 0){
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if(itemForRemoval){
     filterItems = this.removeFromCart(itemForRemoval,false);
    }

    this.cart.next({items:filterItems})
    this._snackBar.open('商品已從購物車中刪除','完成',{duration:3000});
  }
}
