import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartSummaryComponent } from 'src/app/components/cart-summary/cart-summary.component';
import { CartTemplateComponent } from 'src/app/components/cart-template/cart-template.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartTemplateComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private titleService: Title,
    private productService: ProductService
  ) {}

  products$ = this.productService.searchProducts('bag');

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Cart');
    // this.productService.searchProducts('bag')
  }
}
