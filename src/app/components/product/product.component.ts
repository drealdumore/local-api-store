import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('1000ms ease-in')),
      transition('* => void', animate('1000ms ease-in')),
    ]),
  ],
})
export class ProductComponent {
  @Input() products: IProduct[] = [];
  loading: boolean = false;

  private router = inject(Router);
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  routeToDetail(id: string): void {
    this.router.navigate(['/products', id]);
  }

  addToCart(event: Event, id: string, name: string, colour: string): void {
    this.cartService.addToCart(id, name, colour).subscribe(
      (data) => {
        console.log('Item added to cart:', data);
        this.toastr.success('Added to cart')
      },
      (error) => this.toastr.error(error)
    );

    // Stop the event propagation
    event.stopPropagation();
  }
}
