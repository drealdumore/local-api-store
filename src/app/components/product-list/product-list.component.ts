import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  errorMessage: string = '';
  loader: boolean = false;

  constructor(private productService: ProductService) {}

  products$ = this.productService.products$.pipe(
    
    tap(() => (this.loader = false)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
