import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GetOrderModel } from 'src/app/shared/models/order/getOrder.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public orders: Array<GetOrderModel>

  constructor(private orderService: OrderService,
    private loaderService: LoaderService) { }

  async ngOnInit() {
    let loader = await this.loaderService.showLoader();
    this.refreshData(null, async () => await this.loaderService.dismissLoader(loader))
  }

  public refreshData(event?: any, afterFunc?: Function) {
    let endFunc = function () {
      if (afterFunc) {
        afterFunc();
      }
      if (event) {
        event.target.complete();
      }
    };
    this.orderService.getOrders().subscribe(async (data) => {
      this.orders = data;
      endFunc();
    }, () => { endFunc() });
  }

  public open(event: any) {
    let parrent = event.currentTarget.parentElement.parentElement;
    if (parrent.classList.contains('closed')) {
      parrent.classList.remove('closed');
      parrent.classList.add('opened');
      return;
    }
    parrent.classList.remove('opened');
    parrent.classList.add('closed');
  }

}
