import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() products: IProduct[] = [];
}
