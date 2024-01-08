import { Routes } from '@angular/router';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductDetailGuard } from './product-detail.guard';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':id',
    canActivate: [ProductDetailGuard],
    component: ProductDetailComponent,
  },
];
