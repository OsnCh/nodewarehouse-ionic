import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/shared/models/product.model';
import { ProductType } from 'src/app/shared/common/enums/productType.enum';

@Component({
  selector: 'app-list-goods',
  templateUrl: './list-goods.page.html',
  styleUrls: ['./list-goods.page.scss'],
})
export class ListGoodsPage implements OnInit {

  public popularProducts: Array<ProductModel>;

  constructor(
    public readonly autheficationService: AuthenticationService,
    private router:Router) { }

  ngOnInit() {
    this.popularProducts = [{
      name: 'National Geographic',
      price: 200,
      type: ProductType.MAGAZINE,
      description: 'National Geographic is a science and nature magazine that provides readers with engaging articles about nature, history, and world cultures, accompanied by vivid photographs.'
    },
    {
      name: 'National Geographic',
      price: 200,
      type: ProductType.MAGAZINE,
      description: 'National Geographic is a science and nature magazine that provides readers with engaging articles about nature, history, and world cultures, accompanied by vivid photographs.'
    },
    {
      name: 'National Geographic',
      price: 200,
      type: ProductType.MAGAZINE,
      description: 'National Geographic is a science and nature magazine that provides readers with engaging articles about nature, history, and world cultures, accompanied by vivid photographs.'
    },
    {
      name: 'National Geographic',
      price: 200,
      type: ProductType.MAGAZINE,
      description: 'National Geographic is a science and nature magazine that provides readers with engaging articles about nature, history, and world cultures, accompanied by vivid photographs.'
    }]
  }

  public navigateSignIn(){
     this.router.navigate(['/auth','login']);
  }

  public navigateSignUp(){
    this.router.navigate(['/auth','registration'])
  }

}
