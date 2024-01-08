import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  errorMessage: string = '';
  loader: boolean = true;

  products$ = this.productService.products$.pipe(
    tap(() => (this.loader = false)), 
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY; 
    })
  );

  constructor(private productService: ProductService) {}
}
