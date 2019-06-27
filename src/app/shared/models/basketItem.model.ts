import { GetBooksItemModel } from './book/getBooksItem.model';
import { GetMagazinesItemModel } from './magazine/getMagazinesItem.model';
import { ProductType } from '../common/enums/productType.enum';

export class BasketItemModel{
    product: GetBooksItemModel | GetMagazinesItemModel;
    type: ProductType;
    count: number;
}