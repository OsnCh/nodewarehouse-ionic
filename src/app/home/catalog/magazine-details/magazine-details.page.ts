import { Component, OnInit } from '@angular/core';
import { MagazinesService } from 'src/app/services/magazines.service';
import { LoaderService } from 'src/app/services/loader.service';
import { GetMagazinesItemModel } from 'src/app/shared/models/magazine/getMagazinesItem.model';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basker.service';
import { ProductType } from 'src/app/shared/common/enums/productType.enum';
import { AuthenticationService } from 'src/app/services/aunthefication.service';

@Component({
  selector: 'app-magazine-details',
  templateUrl: './magazine-details.page.html',
  styleUrls: ['./magazine-details.page.scss'],
})
export class MagazineDetailsPage implements OnInit {

  public magazine: GetMagazinesItemModel;

  constructor(private magazineService: MagazinesService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    public readonly authenticationService:AuthenticationService) { 
      this.magazine = new GetMagazinesItemModel;
      this.magazine.category = new GetSelectCategoryModel;
    }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadMagazineData(params['id'])
    })
  }

  private async loadMagazineData(id: string){
    let loader = await this.loaderService.showLoader();
    this.magazineService.getMagazineById(id).subscribe(async (data) => {
      this.magazine = data.magazine;
      this.loaderService.dismissLoader(loader); 
    }, async () => this.loaderService.dismissLoader(loader));
  }

  public addProductToBasket(magazine: GetMagazinesItemModel){
    this.basketService.addProduct({
      type: ProductType.MAGAZINE,
      product: magazine,
      count: 1
    })
  }

}
