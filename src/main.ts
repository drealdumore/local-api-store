import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment.prod';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './app/pages/home/home.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'product',
        title: 'Products',
        loadChildren: () =>
          import('./app/components/product.routes').then(
            (r) => r.PRODUCT_ROUTES
          ),
      },
      {
        path: 'wishlist',
        title: 'Wishlist',
        loadComponent: () =>
          import('./app/pages/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
      },
      {
        path: 'profile',
        title: 'Profile',
        loadComponent: () =>
          import('./app/pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'categories',
        title: 'Categories',
        loadComponent: () =>
          import('./app/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'cart',
        title: 'Cart',
        loadComponent: () =>
          import('./app/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: '**',
        title: 'Error',
        loadComponent: () =>
          import('./app/components/error/error.component').then(
            (c) => c.ErrorComponent
          ),
      },
    ]),
  ],
}).catch((err) => console.error(err));
