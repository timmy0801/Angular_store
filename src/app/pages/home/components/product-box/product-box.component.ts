import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;

  @Input() product: Product | undefined;
  // ={
  //   id:1,
  //   title:'77乳加',
  //   price:12,
  //   category:'點心',
  //   description:'好粗',
  //   image:'https://via.placeholder.com/150'
  // };

  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart():void{
    this.addToCart.emit(this.product)
  }

}
