import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'cart', component: CartComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
