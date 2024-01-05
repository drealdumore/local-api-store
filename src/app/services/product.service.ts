import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:5500/api/v1/';

  private http = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((res: any) => {
        return res.JSON();
      })
    );
  }

  // search(str: string, type: string): Observable<any> {
  //   const searchUrl = `${this.url}search?query=${str}&offset=0&limit=20&type=${type}&market=US`;

  // return this.http.get(searchUrl).pipe(
  //   map((res: any) => {
  //     return res.JSON();
  //   })
  // );
  // }
}
