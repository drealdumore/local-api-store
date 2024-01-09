import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BoxComponent } from 'src/app/components/box/box.component';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductComponent } from 'src/app/components/product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductComponent, BoxComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Home')
  }

}
