import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    User,
    FiscalYear
} from '../models/core';

@Injectable()
export class CoreService {
    settings: IAppSettings;
    constructor(
        public http: HttpClient,
        public injector: Injector
    ) {
        this.settings = injector.get(APP_SETTINGS);
    }

    public request<T>(fragment: string, httpOptions = null): Observable<T> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
        httpOptions = httpOptions ? httpOptions : { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<T>(requestUrl, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    public post<T>(fragment: string, data: {}): Observable<T> {
        let postUrl = `${this.settings.apiEndpoint}/${fragment}`;
        let body = JSON.stringify(data);
        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<T>(postUrl, body, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    public put<T>(fragment: string, data: {}): Observable<T> {
        let postUrl = `${this.settings.apiEndpoint}/${fragment}`;
        let body = JSON.stringify(data);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<T>(postUrl, body, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    public delete<T>(fragment: string): Observable<T> {
        let postUrl = `${this.settings.apiEndpoint}/${fragment}`;
        return this.http.delete<T>(postUrl)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return new ErrorObservable('An error occurred:' + error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            return new ErrorObservable(`Backend returned code ${error.status}, ` +
                `error: ${error.error}`);
        }
    };

    public getUsers(): Observable<User[]> {
        return this.request<User[]>('core/users');
    }
    public getFiscalYears(): Observable<FiscalYear[]> {
        return this.request<FiscalYear[]>('core/fiscal-years');
    }

}
