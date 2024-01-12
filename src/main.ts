import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment.prod';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './app/pages/home/home.component';
import { ProductDetailGuard } from './app/components/product-detail.guard';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      [
        { path: 'home', component: HomeComponent, title: 'Home' },
        {
          path: 'auth/login',
          title: 'Login',
          loadComponent: () =>
            import('./app/auth/login/login.component').then(
              (c) => c.LoginComponent
            ),
        },
        {
          path: 'auth/signup',
          title: 'Signup',
          loadComponent: () =>
            import('./app/auth/register/register.component').then(
              (c) => c.RegisterComponent
            ),
        },

        {
          path: 'products/:id',
          title: 'Product Detail',
          canActivate: [ProductDetailGuard],
          loadComponent: () =>
            import('./app/pages/product-detail/product-detail.component').then(
              (c) => c.ProductDetailComponent
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
          path: 'categories/:id',
          title: ' Detail',
          loadComponent: () =>
            import(
              './app/pages/categories-detail/categories-detail.component'
            ).then((c) => c.CategoriesDetailComponent),
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
      ],
      withComponentInputBinding()
    ),
  ],
}).catch((err) => console.error(err));
