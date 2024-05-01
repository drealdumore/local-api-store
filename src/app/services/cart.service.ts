import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import {
  Observable,
  catchError,
  filter,
  forkJoin,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { CartItem, LoginResponse } from '../interfaces/login.interface';
import { ProductService } from './product.service';
import { IProduct } from '../interfaces/product.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:5500/api/v1';

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  // did not work: showing i hav to login even tho i am logged in.
  cartItems(): Observable<IProduct[]> {
    return this.http.get<LoginResponse>(`${this.url}/user/me`).pipe(
      map((data) => data.data.user.cart),
      switchMap((cartItems) => {
        const productObservables: Observable<IProduct>[] = cartItems.map(
          (cartItem) => {
            // Assuming 'productService.findProductById' is the method to find a product by ID
            return this.productService
              .findProducts(cartItem.product)
              .pipe(catchError(this.handleError));
          }
        );

        // Use forkJoin to combine multiple observables into a single observable
        return forkJoin(productObservables);
      })
    );
  }

  private cartItemsLocal(): Observable<IProduct[]> {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const cartItems = userData.user.cart;

      const productObservables: Observable<IProduct>[] = cartItems.map(
        (cartItem: { product: any }) => {
          return this.productService.findProducts(cartItem.product).pipe(
            catchError(this.handleError),
            map((product) => product)
          );
        }
      );

      // Use forkJoin to combine multiple observables into a single observable
      return forkJoin(productObservables).pipe(
        map((products) => products.filter((product) => product !== undefined))
      );
    }

    return of([]);
  }
  cartItemLocalSignal = toSignal(this.cartItemsLocal());

  subTotal = computed(() =>
    this.cartItemLocalSignal()?.reduce(
      (acc, item) => acc + item.quantity * Number(item.discountedHighPrice),
      0
    )
  );

  findInCartArray(id: string): Observable<boolean> {
    const storedUserData = localStorage.getItem('userData');

    return of(storedUserData).pipe(
      map((userData) => {
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const cartItems = parsedUserData.user.cart;
          const productIds = cartItems.map(
            (product: { product: any }) => product.product
          );
          return productIds.includes(id);
        }
        return false;
      }),
      map((data) => data.id === id),
      tap((result) => {
        // Perform side effect, e.g., logging
        console.log(`Product with ID ${id} is in cart: ${result}`);
      })
    );
  }

  addToCart(id: string, name: string, colour: string): Observable<any> {
    const apiUrl = `${this.url}/user/cart`;

    const requestBody = { id, name, colour };
    return this.http.post<any>(apiUrl, requestBody).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  deleteCartItem(id: string): Observable<any> {
    // id = id of item in cart
    const apiUrl = `${this.url}/user/cart/${id}`;

    return this.http.delete(apiUrl).pipe(
      tap((data) => console.log(data)),
      catchError((error) => {
        if (error.status === 404) {
          console.error('Item not found:', error.message);
        } else {
          this.handleError(error);
        }
        throw error;
      })
    );
  }

  get$ = this.http.get<any>(`${this.url}/user/me`).pipe(
    tap((data) => console.log(data)),
    shareReplay(1),
    map((data) => data.data.data),
    catchError(this.handleError)
  );

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

  // handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage: string;

  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }

  //   console.error(errorMessage);

  //   // Returning an observable that emits an error
  //   return throwError(errorMessage);
  // }
}
