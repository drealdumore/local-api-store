import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ProductComponent } from 'src/app/components/product/product.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductComponent, BackBtnComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor( private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Wishlist')
  }

}
