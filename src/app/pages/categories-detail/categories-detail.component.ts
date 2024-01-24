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
  imports: [
    CommonModule,
    ProductComponent,
    BackBtnComponent,
    RouterModule,
    ProductComponent,
  ],
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css'],
})
export class CategoriesDetailComponent {
  constructor(private categoryService: CategoryService) {}

  detail$: Observable<any> | undefined;
  category$: Observable<any> | undefined;

  // new angular 16 feature that allows param id to be gotten via input
  // used instead of activated route to get actvated route id
  @Input() id = '';

  ngOnInit(): void {
    if (this.id) {
      // calling the get category details method for slected id and using observable
      // so i dont have to subscribe or unsubscribe
      this.detail$ = this.categoryService.getCategories(this.id).pipe(
        tap((data) => {
          console.log(data);
        }),

        catchError(() => {
          return EMPTY;
        })
      );

      // calling the get category method. used to get only the selected
      // category name from the id
      this.category$ = this.categoryService.getCategory(this.id).pipe(
        tap((data) => {
          console.log(data);
        }),

        catchError(() => {
          return EMPTY;
        })
      );
    }
  }
}
