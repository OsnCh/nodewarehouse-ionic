import { ProductType } from '../../common/enums/productType.enum';

export class SaveOrderItemModel{
    id: string;
    type: ProductType;
    count: number;
}