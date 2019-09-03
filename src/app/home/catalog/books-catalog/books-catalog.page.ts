import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.sevice';
import { LoaderService } from 'src/app/services/loader.service';
import { GetBooksItemModel } from 'src/app/shared/models/book/getBooksItem.model';
import { ModalController } from '@ionic/angular';
import { BookFilterModalPage } from 'src/app/shared/modals/book-filter-modal/book-filter-modal.page';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { BookFilterModel } from 'src/app/shared/models/bookFilter.model';
import { BasketService } from 'src/app/services/basker.service';
import { ProductType } from 'src/app/shared/common/enums/productType.enum';
import { AuthenticationService } from 'src/app/services/aunthefication.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.page.html',
  styleUrls: ['./books-catalog.page.scss'],
})
export class BooksCatalogPage implements OnInit {

  private filterModel: BookFilterModel;
  private searchText: string;

  private books: GetBooksItemModel[];
  public searchBooks: GetBooksItemModel[];

  private categories: GetSelectCategoryModel[];

  constructor(private booksService: BooksService,
    private loaderService: LoaderService,
    private modalController: ModalController,
    private basketService: BasketService,
    private authenticationService: AuthenticationService) { }

  async ngOnInit() {
    this.filterModel = new BookFilterModel;
    let loader = await this.loaderService.showLoader();
    this.booksService.getBooks().subscribe(async (data) => {
      this.books = data.books;
      this.searchBooks = this.books;
      this.categories = data.categories;
      await this.loaderService.dismissLoader(loader)
    }, async (err) => await this.loaderService.dismissLoader(loader))
  }

  public searchBoxSearch(event) {
    this.searchText = event.srcElement.value;
    this.sort();
  }

  private sort() {
    if (this.searchText) {
      this.searchBooks = this.books.filter((book) => {
        return book.name.toLowerCase().includes(this.searchText.toLowerCase())
      })
    } else {
      this.searchBooks = this.books;
    }
    this.searchBooks = this.searchBooks.filter((book) => {
      let res = (!this.filterModel.categoryId || book.category.id == this.filterModel.categoryId) &&
        (!this.filterModel.minPrice || this.filterModel.minPrice <= book.price) &&
        (!this.filterModel.maxPrice || this.filterModel.maxPrice >= book.price);
      return res;
    });
  }

  public searchCancel() {
    this.searchText = null;
    this.sort();
  }

  public async showFilterModal() {
    debugger;
    let filter = await this.modalController.create({
      component: BookFilterModalPage,
      componentProps: {
        'categories': this.categories,
        'selectedCategoryId': this.filterModel.categoryId,
        'minPrice': this.getMinPrice(),
        'minPriceValue': this.filterModel.minPrice,
        'maxPrice': this.getMaxPrice(),
        'maxPriceValue': this.filterModel.maxPrice,
      },
      cssClass: 'filter-modal'
    })
    await filter.present();
    let dataModal = (await filter.onDidDismiss()).data;
    if (dataModal.value) {
      this.filterModel = dataModal.value;
      this.sort();
    }
  }


  private getMinPrice(): number {
    let sortPriceBooks = this.getBooksSortedPrice();
    return sortPriceBooks[0].price;
  }

  private getMaxPrice(): number {
    let sortPriceBooks = this.getBooksSortedPrice();
    return sortPriceBooks[sortPriceBooks.length - 1].price;
  }

  private getBooksSortedPrice() {
    return this.books.sort((a, b) => (a.price > b.price) ? 1 : -1);
  }

  public addBookToBasket(item: GetBooksItemModel) {
    this.basketService.addProduct({
      type: ProductType.BOOK,
      count: 1,
      product: item
    })
  }

}
