import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay, catchError, throwError } from 'rxjs';
import { IProductResponse, IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private url = 'http://localhost:5500/api/v1';

  constructor(private http: HttpClient) {}
//   {
//     "product": "5f1657ac276d70bd5c5be09e"
// }
// needs id
  // {{URL}}/api/v1/user/wish-list
  private wishlists$ = this.http
    .get<IProductResponse>(`${this.url}/user/wish-list`)
    // .post<IProductResponse>(`${this.url}/user/wish-list`)
    .pipe(
      map((wishlist) => wishlist.data.data),
      shareReplay(1),
      catchError(this.handleError)
    );

  wishlists = toSignal(this.wishlists$, { initialValue: [] as IProduct[] });

  
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
