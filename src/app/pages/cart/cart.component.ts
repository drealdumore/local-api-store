import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartSummaryComponent } from 'src/app/components/cart-summary/cart-summary.component';
import { CartTemplateComponent } from 'src/app/components/cart-template/cart-template.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartTemplateComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Cart');
  }
}
