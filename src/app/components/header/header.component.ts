import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'top',
  standalone: true,
  imports: [CommonModule, SearchComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.cartService.cartItems().reduce
  }

cartCount = signal(12)

// private cartService = inject(CartService);



}
