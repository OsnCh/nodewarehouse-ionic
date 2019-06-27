import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basker.service';
import { BasketItemModel } from '../shared/models/basketItem.model';
import { GetBooksItemModel } from '../shared/models/book/getBooksItem.model';
import { OrderService } from '../services/order.service';
import { SaveOrderModel } from '../shared/models/order/saveOrder.model';
import { SaveOrderItemModel } from '../shared/models/order/saveOrderItem.model';
import { LoaderService } from '../services/loader.service';
import { PopupService } from '../services/popup.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  public items: Array<BasketItemModel>;

  constructor(private basketService: BasketService,
    private orderService: OrderService,
    private loaderService: LoaderService,
    private popupService: PopupService,
    private location: Location) { }

  ngOnInit() {  
    this.items = this.basketService.getProducts();
  }

  public clear(){
    this.basketService.clear();
    this.items = new Array;
  }

  public removeItem(item: BasketItemModel){
    this.basketService.removeProduct(item);
    this.items = this.basketService.getProducts();
  }

  public async createOrder(){
    let queryModel = new SaveOrderModel;
    queryModel.products = this.items.map(v => {
       let item = new SaveOrderItemModel;
       item.count = v.count;
       item.id = v.product.id;
       item.type = v.type;
       return item;
    });
    let loader = await this.loaderService.showLoader();
    this.orderService.create(queryModel).subscribe(async (msg) => {
      await this.popupService.showPopup(msg);
      this.clear();
      this.location.back();
      await this.loaderService.dismissLoader(loader);
    }, async () => await this.loaderService.dismissLoader(loader))
  }

}
