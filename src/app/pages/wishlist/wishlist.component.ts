import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor( private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Wishlist')
  }
}
