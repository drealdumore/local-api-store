import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$: Observable<boolean> | undefined;

  private url = 'http://localhost:5500/api/v1/user';

  constructor(private http: HttpClient) {}

  register(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Observable<any> {
    const apiUrl = `${this.url}/signup`;

    const requestBody = { name, email, password, passwordConfirm };
    return this.http.post<LoginResponse>(apiUrl, requestBody).pipe(
      tap((response) => {
        if (response && response.token) {
          // Save user data to local storage
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.data));
        } else {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
        }
      }),
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const apiUrl = `${this.url}/login`;

    const requestBody = { email, password };
    return this.http.post<LoginResponse>(apiUrl, requestBody).pipe(
      tap((response) => {
        if (response && response.token) {
          // Save user data to local storage
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.data));
        } else {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
        }
      }),
      catchError(this.handleError)
    );
  }

  forgotPassword(email: string): Observable<any> {
    const apiUrl = `${this.url}/forgotPassword`;

    const requestBody = { email };

    return this.http.post<any>(apiUrl, requestBody).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  resetPassword(password: string, passwordConfirm: string): Observable<any> {
    const apiUrl = `${this.url}/resetPassword/:token`;

    const requestBody = { password, passwordConfirm };

    return this.http.post<any>(apiUrl, requestBody).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  changePassword(
    passwordCurrent: string,
    password: string,
    passwordConfirm: string
  ): Observable<any> {
    const apiUrl = `${this.url}/updateMyPassword`;

    const requestBody = { passwordCurrent, password, passwordConfirm };

    return this.http.patch<any>(apiUrl, requestBody).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  logOut(): Observable<any> {
    const apiUrl = `${this.url}/logout`;

    return this.http.get<any>(apiUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }

    return throwError('Something bad happened; please try again later.');
  }
}
