import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cart-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-template.component.html',
  styleUrls: ['./cart-template.component.css'],
})
export class CartTemplateComponent implements OnInit {
  count = signal(1);
  cartItemsWithProducts: any[] = [];

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private toastr = inject(ToastrService);

  // cartItems$ = this.cartService.getCartItems();
  // cartItems$ = this.cartService.getCartItemsWithProducts().subscribe(
  //   (data) => {
  //     this.cartItemsWithProducts = data;
  //     console.log('Cart items with products:', this.cartItemsWithProducts);
  //   },
  //   (error) => {
  //     console.error('Error fetching cart items with products:', error);
  //   }
  // );

  // items$  = 

  // cartItems$ = this.cartService.getCartItems().pipe(
  //   switchMap((cartItems) => {
  //     const productObservables = cartItems.map((cartItem) => {
  //       // Assuming you have a method in your service to get product details by ID
  //       return this.productService.findProducts(cartItem._id);
  //     });

  //     // Combine the observables for individual products into a single observable
  //     return forkJoin(productObservables).pipe(
  //       map((products) => {
  //         // Map the products to the corresponding cart items
  //         return cartItems.map((cartItem, index) => ({
  //           ...cartItem,
  //           product: products[index],
  //         }));
  //       })
  //     );
  //   })
  // );

  // products$ = this.productService
  //   .findProducts('5f33f9222474270017aebcd8')
  //   .pipe(tap((data) => console.log(data)));

  ngOnInit(): void {
    // this.cartService.getCartItemsWithProducts().subscribe(
    //   (data) => {
    //     this.cartItemsWithProducts = data;
    //     console.log('Cart items with products:', this.cartItemsWithProducts);
    //   },
    //   (error) => {
    //     console.error('Error fetching cart items with products:', error);
    //   }
    // );
  }

  decrease() {
    if (this.count() > 0) {
      this.count.set(this.count() - 1);
    }
  }

  deleteCartItem(id: string): void {
    this.cartService.deleteCartItem(id).subscribe(
      (data) => {
        console.log('Item removed from cart:', data);
        this.toastr.success('Removed from cart');
      },
      (error) => this.toastr.error(error)
    );
  }

  // or should i just get the id fromthe cart item and fill template with
  // data from find products

  //  NOW  WIL HAVE TO SEARCH FOR PRODUCT ID AND USE THE DATA GOTTEN TO GET
  // PRICE AND IMG
  // i want to get the cart item first then use the cartitems individual id to find prroduct
}
