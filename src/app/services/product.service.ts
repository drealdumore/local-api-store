import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { IProduct, IProductResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:5500/api/v1';

  constructor(private http: HttpClient) {}

  products$ = this.http.get<IProductResponse>(`${this.url}/product`).pipe(
    map((products) => products.data.data),
    shareReplay(1),
    catchError(this.handleError)
  );

  // products = toSignal(this.products$)
  products = signal(2);

  findProducts(id: string): Observable<IProduct | undefined> {
    return this.products$.pipe(
      map((products) => products.find((product) => product.id === id)),
      tap((product) => console.log('pro :', product)),
      catchError(this.handleError)
    );
  }

  getProduct(id: string): Observable<any> {
    const productUrl = `${this.url}/product/${id}`;
    return this.http.get<any>(productUrl).pipe(
      map((data) => data.data.data),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  getRelatedProducts(id: string): Observable<IProduct[]> {
    const productUrl = `${this.url}/product/related/${id}`;
    return this.http.get<IProductResponse>(productUrl).pipe(
      map((product) => product.data.data),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  searchProducts(query: string): Observable<IProduct[]> {
    const productUrl = `${this.url}/product/search?search=${query}`;
    return this.http.get<IProductResponse>(productUrl).pipe(
      tap((data) => console.log(data)),
      map((product: IProductResponse) => product.data.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }

    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
