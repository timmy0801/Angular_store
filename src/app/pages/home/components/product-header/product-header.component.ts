import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-header',
  templateUrl:'product-header.component.html',
})
export class ProductHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount =12;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(neswSort:string):void{
    this.sort = neswSort;
    this.sortChange.emit(neswSort);
  }

  onItemUpdated(count:number):void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnUpdated(colsNum:number):void{
    this.columnsCountChange.emit(colsNum);
  }
}
