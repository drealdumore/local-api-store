import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailGuard implements CanActivate {
  constructor(private router: Router, private productService: ProductService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const productExists = !!this.productService.getProduct(route.params['id']);

    if (!productExists) this.router.navigate(['/404']);
    return productExists;
  }
}

// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductDetailGuard {
//   constructor(private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     const id = route.paramMap.get('id');

//     // Assuming id should be a non-empty string
//     if (!id || id.trim() === '') {
//       alert('Invalid product id');
//       this.router.navigate(['/home']);
//       return false;
//     }

//     return true;
//   }
// }
