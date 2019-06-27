import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveOrderModel } from '../shared/models/order/saveOrder.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class OrderService{
    constructor(private httpClient: HttpClient){}
    
    create(saveOrderModel: SaveOrderModel):Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}order/create`, 
            saveOrderModel, {responseType: 'text'});
    }
}