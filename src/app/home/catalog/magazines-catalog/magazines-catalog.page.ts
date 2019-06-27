import { Component, OnInit } from '@angular/core';
import { GetMagazinesItemModel } from 'src/app/shared/models/magazine/getMagazinesItem.model';
import { MagazinesService } from 'src/app/services/magazines.service';
import { LoaderService } from 'src/app/services/loader.service';
import { BasketService } from 'src/app/services/basker.service';
import { ProductType } from 'src/app/shared/common/enums/productType.enum';
import { AuthenticationService } from 'src/app/services/aunthefication.service';

@Component({
  selector: 'app-magazines-catalog',
  templateUrl: './magazines-catalog.page.html',
  styleUrls: ['./magazines-catalog.page.scss'],
})
export class MagazinesCatalogPage implements OnInit {

  private magazines: GetMagazinesItemModel[];
  public searchMagazines: GetMagazinesItemModel[];

  constructor(private magazinesService: MagazinesService,
    private loaderService: LoaderService,
    private basketService: BasketService,
    private authenticationService:AuthenticationService) { }

  async ngOnInit() {
    let loader = await this.loaderService.showLoader();
    this.magazinesService.getMagazines().subscribe(async (data) => {
      this.magazines = data.magazines;
      this.searchMagazines = this.magazines;
      await this.loaderService.dismissLoader(loader)
    }, async (err) => await this.loaderService.dismissLoader(loader))
  }

  public searchBoxSearch(event){
    let searchText = event.srcElement.value;
    if(!searchText){
      this.searchCancel();
      return;
    }
    this.searchMagazines = this.magazines.filter((magazine) => {
      return magazine.name.toLowerCase().includes(searchText.toLowerCase())
    })
  }

  public searchCancel(){
    this.searchMagazines = this.magazines;
  }

  public addProductToBasket(magazine: GetMagazinesItemModel){
    this.basketService.addProduct({
      type: ProductType.MAGAZINE,
      product: magazine,
      count: 1
    })
  }

}
