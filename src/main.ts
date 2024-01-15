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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './app/pages/home/home.component';
import { ProductDetailGuard } from './app/components/product-detail.guard';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AuthGuard } from './app/auth/auth.guard';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      ToastrModule.forRoot()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      [
        {
          path: 'home',
          component: HomeComponent,
          title: 'Home',
          canActivate: [AuthGuard],
        },
        {
          path: 'auth/login',
          title: 'Login',
          loadComponent: () =>
            import('./app/auth/login/login.component').then(
              (c) => c.LoginComponent
            ),
        },
        {
          path: 'auth/register',
          title: 'Signup',
          loadComponent: () =>
            import('./app/auth/register/register.component').then(
              (c) => c.RegisterComponent
            ),
        },

        {
          path: 'products/:id',
          title: 'Product Detail',
          canActivate: [ProductDetailGuard, AuthGuard],
          loadComponent: () =>
            import('./app/pages/product-detail/product-detail.component').then(
              (c) => c.ProductDetailComponent
            ),
        },
        {
          path: 'wishlist',
          title: 'Wishlist',
          canActivate: [AuthGuard],
          loadComponent: () =>
            import('./app/pages/wishlist/wishlist.component').then(
              (c) => c.WishlistComponent
            ),
        },
        {
          path: 'profile',
          title: 'Profile',
          canActivate: [AuthGuard],
          loadComponent: () =>
            import('./app/pages/profile/profile.component').then(
              (c) => c.ProfileComponent
            ),
        },
        {
          path: 'categories',
          title: 'Categories',
          canActivate: [AuthGuard],
          loadComponent: () =>
            import('./app/pages/categories/categories.component').then(
              (c) => c.CategoriesComponent
            ),
        },
        {
          path: 'categories/:id',
          title: ' Detail',
          canActivate: [AuthGuard],
          loadComponent: () =>
            import(
              './app/pages/categories-detail/categories-detail.component'
            ).then((c) => c.CategoriesDetailComponent),
        },
        {
          path: 'cart',
          title: 'Cart',
          canActivate: [AuthGuard],
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

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { environment } from './environments/environment.prod';
// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import {
//   provideHttpClient,
//   withInterceptorsFromDi,
// } from '@angular/common/http';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { provideRouter, withComponentInputBinding } from '@angular/router';

// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HomeComponent } from './app/pages/home/home.component';
// import { ProductDetailGuard } from './app/components/product-detail.guard';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
//       BrowserModule,
//       BrowserAnimationsModule,
// provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
// provideFirestore(() => getFirestore()),
//       ToastrModule.forRoot()
//     ),
//     provideHttpClient(withInterceptorsFromDi()),
//     provideRouter(
//       [
//         { path: 'home', component: HomeComponent, title: 'Home' },
//         {
//           path: 'auth/login',
//           title: 'Login',
//           loadComponent: () =>
//             import('./app/auth/login/login.component').then(
//               (c) => c.LoginComponent
//             ),
//         },
//         {
//           path: 'auth/register',
//           title: 'Signup',
//           loadComponent: () =>
//             import('./app/auth/register/register.component').then(
//               (c) => c.RegisterComponent
//             ),
//         },

//         {
//           path: 'products/:id',
//           title: 'Product Detail',
//           canActivate: [ProductDetailGuard],
//           loadComponent: () =>
//             import('./app/pages/product-detail/product-detail.component').then(
//               (c) => c.ProductDetailComponent
//             ),
//         },
//         {
//           path: 'wishlist',
//           title: 'Wishlist',
//           loadComponent: () =>
//             import('./app/pages/wishlist/wishlist.component').then(
//               (c) => c.WishlistComponent
//             ),
//         },
//         {
//           path: 'profile',
//           title: 'Profile',
//           loadComponent: () =>
//             import('./app/pages/profile/profile.component').then(
//               (c) => c.ProfileComponent
//             ),
//         },
//         {
//           path: 'categories',
//           title: 'Categories',
//           loadComponent: () =>
//             import('./app/pages/categories/categories.component').then(
//               (c) => c.CategoriesComponent
//             ),
//         },
//         {
//           path: 'categories/:id',
//           title: ' Detail',
//           loadComponent: () =>
//             import(
//               './app/pages/categories-detail/categories-detail.component'
//             ).then((c) => c.CategoriesDetailComponent),
//         },
//         {
//           path: 'cart',
//           title: 'Cart',
//           loadComponent: () =>
//             import('./app/pages/cart/cart.component').then(
//               (c) => c.CartComponent
//             ),
//         },
//         {
//           path: '',
//           redirectTo: '/home',
//           pathMatch: 'full',
//         },
//         {
//           path: '**',
//           title: 'Error',
//           loadComponent: () =>
//             import('./app/components/error/error.component').then(
//               (c) => c.ErrorComponent
//             ),
//         },
//       ],
//       withComponentInputBinding()
//     ),
//   ],
// }).catch((err) => console.error(err));
