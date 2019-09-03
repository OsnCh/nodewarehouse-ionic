import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveOrderModel } from '../shared/models/order/saveOrder.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GetOrderModel } from '../shared/models/order/getOrder.model';

@Injectable()
export class OrderService{
    constructor(private httpClient: HttpClient){}
    
    create(saveOrderModel: SaveOrderModel):Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}order/create`, 
            saveOrderModel, {responseType: 'text'});
    }

    getOrders(): Observable<Array<GetOrderModel>>{
        return this.httpClient.get<Array<GetOrderModel>>(`${environment.apiUrl}order/get`)
    }
}