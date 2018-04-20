import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service'
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    Book,
    Category,
} from '../models';

@Injectable()
export class PersonalService extends CoreService {
    constructor(
        public http: HttpClient,
        public injector: Injector
    ) {
        super(http, injector);
    }

    // Books
    public getBooks(name: string, year: string, categories: string[]): Observable<Book[]> {
        let params = new HttpParams();
        categories.map(c => params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<Book[]>(`personal/books/year/${year}/user/${name}`, httpOptions);
    }
    public getBook(name: string, bookName: string): Observable<Book> {
        return this.request<Book>(`personal/books/user/${name}/book/${bookName}`, null);
    }
    public getBooksByAuthor(name: string): Observable<Book[]> {
        return this.request<Book[]>(`personal/books/author/${name}`, null);
    }
    public getBookCategories(): Observable<Category[]> {
        return this.request<Category[]>('personal/books/categories', null);
    }


}
