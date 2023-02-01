import { StoreService } from './../../services/store.service';
import { Product } from './../../models/product.model';
import { CartService } from './../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT :{[id:number]:number}= {1:400,3:335,4:350};

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
})
export class HomeComponent implements OnInit,OnDestroy{

  cols =3
  category :string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products:Array<Product> |undefined;
  sort= 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private CartService:CartService,private storeService:StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{
    this.productSubscription = this.storeService.getAllProducts(this.count,this.sort,this.category).subscribe((_products)=>{
      this.products = _products;
    })
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newcategory:string):void{
    this.category =newcategory;
    this.getProducts();
  }

  onAddToCart(product:Product){
    this.CartService.addToCart({
      product:product.image,
      name:product.title,
      price:product.price,
      quantity:1,
      id:product.id
    })
  }
  

  onItemsCountChange(newcount:number):void{
    this.count = newcount.toString();
    this.getProducts();
  }

  onSortChange(sortch:string):void{
    this.sort = sortch;
    this.getProducts();
  }
  ngOnDestroy(): void {
      if (this.productSubscription){
        this.productSubscription.unsubscribe();
      }
  }
}
