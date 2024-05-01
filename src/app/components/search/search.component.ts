import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  query: string = '';
  searchResults$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      input: [''],
    });

    const control = this.searchForm.get('input');

    if (control) {
      control.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        this.search();
      });
    }
  }

  search(): void {
    this.query = this.searchForm.get('input')!.value;

    // Navigate to the SearchResultsComponent with the 'search' query parameter
    this.router.navigate(['/search'], { queryParams: { search: this.query } });
  }
}
