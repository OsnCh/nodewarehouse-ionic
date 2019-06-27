import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.sevice';
import { GetBookModel } from 'src/app/shared/models/book/getBook.model';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { GetBooksItemModel } from 'src/app/shared/models/book/getBooksItem.model';
import { BasketService } from 'src/app/services/basker.service';
import { ProductType } from 'src/app/shared/common/enums/productType.enum';
import { AuthenticationService } from 'src/app/services/aunthefication.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  public book: GetBookModel;

  constructor(private booksService: BooksService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    public location: Location,
    private basketService: BasketService,
    private autheficationService:AuthenticationService) { 
      this.book = new GetBookModel;
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadData(params['id']);
    });
  }

  async loadData(bookId: string){
    let loader = await this.loaderService.showLoader();
    this.booksService.getById(bookId).subscribe(async (data) => {
      this.book = data;
      await this.loaderService.dismissLoader(loader);
    }, async () => await this.loaderService.dismissLoader(loader))
  }

  public addToBasket(){
    let item = new GetBooksItemModel;
    item.id = this.book.id;
    item.name = this.book.name;
    item.price = this.book.price;
    item.category = {id: null, name: this.book.categoryName};
    item.description = this.book.description;
    this.basketService.addProduct({
      type: ProductType.BOOK,
      product: item,
      count: 1
    });
  }


}
