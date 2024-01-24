import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICategoryResponse } from '../interfaces/categories.interface';
import { IProduct, IProductResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://localhost:5500/api/v1';

  constructor(private http: HttpClient) {}

  // get all categories
  categories$ = this.http.get<ICategoryResponse>(`${this.url}/category`).pipe(
    map((categories) => categories.data.data),
    // to remove the first object in the array because it is empty
    map((categories) => categories.slice(1)),
    catchError(this.handleError)
  );

  // get categories details like all products that have category id
  getCategories(id: string): Observable<IProduct[]> {
    const categoryUrl = `${this.url}/product/search?category=${id}`;
    return this.http.get<IProductResponse>(categoryUrl).pipe(
      map((response: IProductResponse) => response.data.data),
      catchError(this.handleError)
    );
  }

  // get single category details like name and id.
  getCategory(id: string): Observable<IProduct[]> {
    const categoryUrl = `${this.url}/category/${id}`;
    return this.http.get<IProductResponse>(categoryUrl).pipe(
      map((response: IProductResponse) => response.data.data),
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
