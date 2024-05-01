import { CommonModule } from '@angular/common';
import { Component, inject  } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'top',
  standalone: true,
  imports: [CommonModule, SearchComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {




private  cartService = inject(CartService)
cartItems = this.cartService.cartItemLocalSignal



}
