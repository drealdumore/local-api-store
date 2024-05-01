import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
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

  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  // cartItems = this.cartService.cartItems()
  cartItems = this.cartService.cartItemLocalSignal;

  decrease() {
    if (this.count() > 0) {
      this.count.set(this.count() - 1);
    }
  }

  addToCart(id: string, name: string, colour: string) {
    this.cartService.addToCart(id, name, colour);
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

  ngOnInit(): void {}

  // or should i just get the id from the cart item and fill template with
  // data from find products

  //  NOW  WIL HAVE TO SEARCH FOR PRODUCT ID AND USE THE DATA GOTTEN TO GET
  // PRICE AND IMG
  // i want to get the cart item first then use the cartitems individual id to find prroduct
}
