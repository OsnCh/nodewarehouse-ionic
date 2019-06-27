import { Component, OnInit, ViewChild } from '@angular/core';
import { GetCategoriesItemModel } from '../../models/category/getCategoriesItem.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-filter-modal',
  templateUrl: './book-filter-modal.page.html',
  styleUrls: ['./book-filter-modal.page.scss'],
})
export class BookFilterModalPage implements OnInit{

  @ViewChild('price') priceFilter;
  @ViewChild('selectCategories') selectCategories;

  public categories: GetCategoriesItemModel[];
  public selectedCategoryId: string;
  public minPrice: number;
  public minPriceValue: number;
  public maxPrice: number;
  public maxPriceValue: number;

  constructor(private modalController: ModalController) { 
  }

  ngOnInit(){
    this.priceFilter.value = {
      lower: (this.minPriceValue) ? this.minPriceValue : this.minPrice, 
      upper: (this.maxPriceValue) ? this.maxPriceValue : this.maxPrice 
    }
    this.selectCategories.value = this.selectedCategoryId;
  }

  public async close(){
    let modal = await this.modalController.getTop();
    if(modal){
      await modal.dismiss({ value: {
          categoryId: this.selectCategories.value,
          minPrice: this.priceFilter.value.lower,
          maxPrice: this.priceFilter.value.upper
        } 
      })
    }
  }

}
