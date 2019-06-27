import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BasketPage } from './basket.page';
import { BasketService } from '../services/basker.service';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from '../services/order.service';

const routes: Routes = [{
    path: '',
    component: BasketPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [BasketPage],
  providers: [BasketService, OrderService]
})
export class BasketPageModule {}
