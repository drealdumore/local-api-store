import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/interfaces/categories';

@Component({
  selector: 'category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() categories: ICategory[] = []

}
