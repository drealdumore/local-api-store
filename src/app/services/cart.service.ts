import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { CartItem, LoginResponse } from '../interfaces/login.interface';
import { ProductService } from './product.service';
import { and } from '@angular/fire/firestore';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:5500/api/v1';

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  // getCartItems(): Observable<CartItem[]> {
  //   // {{URL}}/api/v1/user/me
  //   const apiUrl = `${this.url}/user/me`

  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     const cartItems = userData.user.cart;
  //     console.log(cartItems);
  //     return of(cartItems);
  //   }

  //   return of([]);
  // }

  cartItems(id: string): Observable<IProduct | undefined> {
    return this.http.get<LoginResponse>(`${this.url}/user/me`).pipe(
      map((data) => data.data.user.cart),
      tap((data) => console.log(data)),
      switchMap((id) =>
        this.productService.findProducts('5f33f9222474270017aebcd8').pipe(
          tap((data) => console.log(data)),
          catchError(this.handleError)
        )
      )
    );
  }

  // getCartItemsWithProducts(): Observable<IProduct | undefined> {
  //   return this.http.get<LoginResponse>(`${this.url}/user/me`).pipe(
  //     map((data) => data.data.user.cart),
  //     map((data) => data.map((cartItem) => cartItem._id)),
  //     tap((data) => console.log(data)),
  //     switchMap((id) =>
  //       this.productService.findProducts(id).pipe(
  //         tap((data) => console.log(data)),
  //         catchError(this.handleError)
  //       )
  //     ),
  //     catchError(this.handleError)
  //   );
  // }

  // getCartItemsWithProducts(): Observable<IProduct | undefined> {
  //   return this.http.get<LoginResponse>(`${this.url}/user/me`).pipe(
  //     map((data) => data.data.user.cart),
  //     map((data) => data.map((cartItem) => cartItem._id)),
  //     tap((data) => console.log(data)),
  //     switchMap((id) =>
  //       this.productService.findProducts(id).pipe(
  //         tap((data) => console.log(data)),
  //         catchError(this.handleError)
  //       )
  //     ),
  //     catchError(this.handleError)
  //   );
  // }

  // cartrtItems$ = this.cartService.getCartItems().pipe(
  //     switchMap((cartItems) => {
  // const productObservables = cartItems.map((cartItem) => {
  //   // Assuming you have a method in your service to get product details by ID
  //   return this.productService.findProducts(cartItem._id);
  // });

  //       // Combine the observables for individual products into a single observable
  //       return forkJoin(productObservables).pipe(
  //         map((products) => {
  //           // Map the products to the corresponding cart items
  //           return cartItems.map((cartItem, index) => ({
  //             ...cartItem,
  //             product: products[index],
  //           }));
  //         })
  //       );
  //     })
  //   );

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

  ngOnInit(): void {
    // this.cartService.getCartItemsWithProducts().subscribe(
    //   (data) => {
    //     this.cartItemsWithProducts = data;
    //     console.log('Cart items with products:', this.cartItemsWithProducts);
    //   },
    //   (error) => {
    //     console.error('Error fetching cart items with products:', error);
    //   }
    // );
  }

  get$ = this.http.get<any>(`${this.url}/user/me`).pipe(
    tap((data) => console.log(data)),
    shareReplay(1),
    map((data) => data.data.data),
    catchError(this.handleError)
  );

  // getCartItemsWithProducts(): Observable<any[]> {
  //   return this.getCartItems().pipe(
  //     map((cartItems) => cartItems.map((cartItem) => cartItem._id)),
  //     map((productIds) =>
  //       forkJoin(
  //         productIds.map((productId) =>
  //           this.productService.findProducts(productId)
  //         )
  //       )
  //     ),
  //     catchError(this.handleError)
  //   );
  // }

  // getCartItemsWithProducts(): Observable<any[]> {
  //   return this.getCartItems().pipe(
  //     map((cartItems) => cartItems.map((cartItem) => cartItem._id)),
  //     mergeMap((productIds) =>
  //       forkJoin(
  //         productIds.map((productId) =>
  //           this.productService.findProducts(productId)
  //         )
  //       )
  //     ),
  //     catchError(this.handleError)
  //   );
  // }

  // getCartItemsWithProducts(): Observable<any[]> {
  //   return this.getCartItems().pipe(
  //     map((cartItems) => cartItems.map((cartItem) => cartItem._id)),
  //     mergeMap((productIds) => {
  //       const observables = productIds.map((productId) =>
  //         this.productService.findProducts(productId).pipe(
  //           catchError((error) => {
  //             console.error(
  //               `Error fetching product with ID ${productId}:`,
  //               error
  //             );
  //             return of(null);
  //           })
  //         )
  //       );
  //       return forkJoin(observables);
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

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
