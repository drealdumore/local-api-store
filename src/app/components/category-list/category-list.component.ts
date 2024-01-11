import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { tap, catchError, EMPTY } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BackBtnComponent } from '../back-btn/back-btn.component';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [CommonModule, CategoryComponent, HttpClientModule, BackBtnComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  errorMessage: any;
  data: any;

  categories$ = this.categoryService.categories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  ngOnInit(): void {}
}
