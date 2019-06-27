import { PopupService } from './popup.service';
import { Injectable } from '@angular/core';
import { BasketItemModel } from '../shared/models/basketItem.model';
import { AuthenticationService } from './aunthefication.service';
import { Router } from '@angular/router';

const BasketLocalStorageKey = 'basket' 

@Injectable()
export class BasketService{
    constructor(private popupService: PopupService,
        private autheficationService: AuthenticationService,
        private router: Router){}

    async addProduct(product: BasketItemModel){
        if(!this.autheficationService.isLogined()){
            this.router.navigate(['/auth']);
            return;
        }
        let arrayProducts = this.getProducts();
        let analogProduct = arrayProducts.find(v => v.type == product.type &&
            v.product.id == product.product.id);
        if(analogProduct){
            product.count += analogProduct.count;
            arrayProducts =  arrayProducts.filter((pr) => 
                                !(pr.type == analogProduct.type
                                && pr.product.id == analogProduct.product.id));
        }
        arrayProducts.push(product);
        localStorage.setItem(BasketLocalStorageKey, JSON.stringify(arrayProducts));
        await this.popupService.showPopup("Product addet to basket...");
    }

    getProducts(): Array<BasketItemModel>{
        let arrayProductsJSON = localStorage.getItem(BasketLocalStorageKey);
        let arrayProducts: Array<BasketItemModel> = (arrayProductsJSON)?JSON.parse(arrayProductsJSON):new Array;
        return arrayProducts;
    }

    getProductCount(){
        let products = this.getProducts();
        if(!products){
            return 0;
        }
        return products.length;
    }

    getPrice(){
        let products = this.getProducts();
        let price = 0;
        if(!products){
            return price;
        }
        products.forEach(pr => {
            price += pr.count * pr.product.price;
        });
        return price;
    }

    removeProduct(item: BasketItemModel){
        let products = this.getProducts()
        if(!products){
            return;
        }
        products = products.filter((pr) => 
            !(pr.type == pr.type
            && pr.product.id == item.product.id));
        localStorage.setItem(BasketLocalStorageKey, JSON.stringify(products));
    }

    clear(){
        localStorage.removeItem(BasketLocalStorageKey);
    }
}