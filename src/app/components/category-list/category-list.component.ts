import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { tap, catchError, EMPTY } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [CommonModule, CategoryComponent, HttpClientModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  errorMessage: any;
  data: any;

  categories$ = this.categoryService.categories$.pipe(
    tap((data) => console.log(data)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  ngOnInit(): void {}
}
