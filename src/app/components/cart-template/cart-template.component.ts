import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-template.component.html',
  styleUrls: ['./cart-template.component.css'],
})
export class CartTemplateComponent {
  count = signal(1);

  decrease() {
    if (this.count() > 0) {
      this.count.set(this.count() - 1);
    }
  }
}
