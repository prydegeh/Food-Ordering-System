import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer } from './models/customer'; 

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private baseUrl = "http://localhost:8100/customers";

  constructor(private http: HttpClient) { }

  private log(message: string) {
    console.log(`LoginService: ${message}`);
  }

  getCustomerByUserName(username:string):Observable<Customer> {
    const fullUrl = this.baseUrl + "/getCustomerByUserName/"+username;
    console.log("full Url =" + fullUrl)
    return this.http.get<Customer>(fullUrl)
      .pipe(
        tap(_ => this.log('fetched a customer')),
        catchError(this.handleError<Customer>('getCustomerByUsernName'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}