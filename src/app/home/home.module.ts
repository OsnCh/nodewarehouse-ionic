import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ListGoodsPage } from './list-goods/list-goods.page';
import { SharedModule } from '../shared/shared.module';
import { CatalogPage } from './catalog/catalog.page';
import { BooksCatalogPage } from './catalog/books-catalog/books-catalog.page';
import { MagazinesCatalogPage } from './catalog/magazines-catalog/magazines-catalog.page';
import { BooksService } from '../services/books.sevice';
import { MagazinesService } from '../services/magazines.service';
import { BookDetailsPage } from './catalog/book-details/book-details.page';
import { MagazineDetailsPage } from './catalog/magazine-details/magazine-details.page';
import { BasketService } from '../services/basker.service';
import { OrdersPage } from './orders/orders.page';
import { OrderService } from '../services/order.service';
import { LogInAuthGuard } from '../core/guards/logInAuth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/home/listgoods', pathMatch: 'full', data: { title: 'List goods' }
  },
  {
    path: "", component: HomePage,
    children: [
      {
        path: 'listgoods', component: ListGoodsPage, data: { title: 'List goods' },
      },
      { 
        path: 'catalog', component: CatalogPage, data: { title: 'Catalog' } 
      },
      {
        path: 'catalog/books', component: BooksCatalogPage, data: { title: 'Books catalog' }
      },
      {
        path: 'catalog/book/:id', component: BookDetailsPage, data: { title: "Book details" }
      },
      {
        path: 'catalog/magazines', component: MagazinesCatalogPage, data: { title: 'Magazines catalog' }
      }
      ,
      {
        path: 'catalog/magazine/:id', component: MagazineDetailsPage, data: { title: 'Magazine details' }
      },
      {
        path: 'orders', component: OrdersPage, data: { title: 'Orders' }, canActivate: [LogInAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: 
  [ HomePage, 
    ListGoodsPage, 
    CatalogPage, 
    BooksCatalogPage, 
    BookDetailsPage, 
    MagazinesCatalogPage,
    MagazineDetailsPage,
    OrdersPage 
  ],
  providers: [ BooksService, MagazinesService, BasketService, OrderService ]
})
export class HomePageModule { }
