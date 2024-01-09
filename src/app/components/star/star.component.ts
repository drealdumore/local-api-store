import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'star',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 4;
  cropWidth: number = 75;

  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }
}