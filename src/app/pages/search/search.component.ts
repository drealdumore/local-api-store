import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ProductComponent, BackBtnComponent, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchResults$: Observable<IProduct[]> | undefined;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Read the 'search' query parameter from the route
    this.searchResults$ = this.route.queryParams.pipe(
      switchMap((params) => {
        this.query = params['search'] || '';

        // Call the productService.searchProducts with the new query
        return this.productService.searchProducts(this.query);
      })
    );
  }
}

