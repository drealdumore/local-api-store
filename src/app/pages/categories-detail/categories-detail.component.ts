import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, catchError, EMPTY, tap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories-detail',
  standalone: true,
  imports: [CommonModule, ProductComponent, BackBtnComponent, RouterModule],
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css'],
})
export class CategoriesDetailComponent {
  constructor(private categoryService: CategoryService) {}

  detail$: Observable<any> | undefined;
  loading: boolean = true;

  @Input() id = '';

  ngOnInit(): void {
    if (this.id) {
      this.detail$ = this.categoryService.getCategory(this.id).pipe(
        tap((data) => console.log(data)),
        catchError(() => {
          return EMPTY;
        })
      );
    }

    // this.detail$ = this.categoryService.getCategory(this.id)
  }
}
