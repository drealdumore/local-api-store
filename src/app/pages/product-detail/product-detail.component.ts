import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, EMPTY, Observable, map } from 'rxjs';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { StarComponent } from 'src/app/components/star/star.component';
import { IProduct } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, StarComponent, BackBtnComponent, ProductComponent, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  mainImageUrl: string = '';
  activeImage: string | null = null;

  detail$: Observable<any> | undefined;
  related$: Observable<any> | undefined;

  loading: boolean = false;
  materialActive: boolean = false;
  modelActive: boolean = false;
  descriptionActive: boolean = true;

  @Input() id = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, 
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach(() => {
      if (this.id) {
        this.detail$ = this.productService.getProduct(this.id).pipe(
          catchError(() => {
            return EMPTY;
          })
        );

        this.related$ = this.productService.getRelatedProducts(this.id).pipe(
          catchError(() => {
            return EMPTY;
          })
        );
      }
    });
  }


  addToCart(id: string, name: string, colour: string) {
    this.cartService.addToCart(id, name, colour).subscribe(
      (data) => {
        console.log('Item Added to cart:', data);
        this.toastr.success('Added to cart');
      },
      (error) => this.toastr.error(error)
    );
  }

  changeMainImage(img: string): boolean {
    this.activeImage = img;
    this.mainImageUrl = 'http://localhost:5500/img/products/800x800_' + img;
    return true; // Return true to indicate the image is active
  }

  isActiveImage(img: string): boolean {
    return this.activeImage === img;
  }

  get detail(): any {
    return this.detail$;
  }

  changeMainImageByColor(color: string): void {
    // Ensure that detail is not undefined or null
    if (this.detail && this.detail.colour) {
      // Find the corresponding color in the detail object
      const selectedColor = this.detail.colour.find(
        (c: any) => c.colour === color
      );
      console.log(selectedColor);
      if (selectedColor) {
        // Update the main image based on the selected color
        this.mainImageUrl =
          'http://localhost:5500/img/products/800x800_' +
          (selectedColor.colourImage || this.detail.imageCover);
      }
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
