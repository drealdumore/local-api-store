import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cart-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {
  quantity = signal(1);
  qtyAvaliable = signal([1, 2, 3, 4, 5, 6]);

  qtyEff = effect(() => console.log('latest quantity:', this.quantity()));

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);
    
  }
}
