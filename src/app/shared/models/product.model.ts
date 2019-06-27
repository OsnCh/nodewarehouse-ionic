import { ProductType } from '../common/enums/productType.enum';

export class ProductModel{
    name: string;
    type: ProductType;
    price: number;
    description: string;
}