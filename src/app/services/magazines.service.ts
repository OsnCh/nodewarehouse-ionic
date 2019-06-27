import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMagazinesModel } from '../shared/models/magazine/getMagazines.model';
import { environment } from 'src/environments/environment';
import { GetMagazineModel } from '../shared/models/magazine/getMagazine.model';

@Injectable()
export class MagazinesService{

    constructor(private httpClient: HttpClient){}

    getMagazines(): Observable<GetMagazinesModel>{
        return this.httpClient.get<GetMagazinesModel>(`${environment.apiUrl}magazine/all`);
    }

    getMagazineById(id: string): Observable<GetMagazineModel>{
        return this.httpClient.get<GetMagazineModel>(`${environment.apiUrl}magazine/${id}`);
    }
}