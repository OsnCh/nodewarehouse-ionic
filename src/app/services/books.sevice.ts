import { Injectable } from '@angular/core';
import { GetBooksModel } from '../shared/models/book/getBooks.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetBookModel } from '../shared/models/book/getBook.model';

@Injectable()
export class BooksService{

    constructor(private httpClient: HttpClient){}

    getById(id: string): Observable<GetBookModel>{
        return this.httpClient.get<GetBookModel>(`${environment.apiUrl}book/${id}`);
    }

    getBooks(): Observable<GetBooksModel>{
        return this.httpClient.get<GetBooksModel>(`${environment.apiUrl}book/all`);
    }
}