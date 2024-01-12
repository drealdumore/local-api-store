import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { tap, catchError, EMPTY, Observable, map } from 'rxjs';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { StarComponent } from 'src/app/components/star/star.component';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, StarComponent, BackBtnComponent, ProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductDetailComponent implements OnInit {
  constructor(private productService: ProductService) {}

  detail$: Observable<any> | undefined;
  related$: Observable<any> | undefined;
  loading: boolean = false;

  @Input() id = '';

  ngOnInit(): void {
    if (this.id) {
      this.detail$ = this.productService.getProduct(this.id).pipe(
        map((data) => data.data.data),

        catchError(() => {
          return EMPTY;
        })
      );

      // this.related$ = this.productService.getRelatedProducts(this.id).pipe(
      //   tap((data) => console.log(data)),
      //   map((data) => data.data.data),

      //   catchError(() => {
      //     return EMPTY;
      //   })
      // );

      // Inside ProductDetailComponent
this.related$ = this.productService.getRelatedProducts(this.id).pipe(
  tap((data) => console.log('Related Products:', data)),
  map((data) => data.data.data),
  catchError(() => EMPTY)
);

    }
  }

  extractName(fullName: string): string {
    // Split the full name into individual words
    const nameParts = fullName.split(' ');

    // Check if the first name has more than one character
    if (nameParts.length > 1 && nameParts[1].length > 1) {
      // Concatenate the first name and the first character of the second name
      return nameParts[0] + ' ' + nameParts[1].charAt(0) + '.';
    } else {
      // Return the original full name if it doesn't follow the expected format
      return fullName;
    }
  }
}
