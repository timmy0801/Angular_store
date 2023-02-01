import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.components.html',
})
export class FiltersComponent implements OnInit,OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubsription :Subscription |undefined;
  categories : Array<string> |undefined;

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.categoriesSubsription = this.storeService.getAllCategories()
    .subscribe((response)=>{
      this.categories =response;
    });
  }

  onShowCategory(category:string):void{
    this.showCategory.emit(category)
  }

  ngOnDestroy(): void {
      if(this.categoriesSubsription){
        this.categoriesSubsription.unsubscribe();
      }
  }
}
