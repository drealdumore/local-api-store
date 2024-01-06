import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://localhost:5500/api/v1';

  constructor(private http: HttpClient) {}

  categories$ = this.http.get<any[]>(`${this.url}/category`).pipe(
    tap((data) => console.log('categories:', JSON.stringify(data))),
    map((categories) => categories),
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
}
