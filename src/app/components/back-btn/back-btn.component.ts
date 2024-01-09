import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'back-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.css'],
})
export class BackBtnComponent {
  constructor(private location: Location) {}

  back(): void {
    this.location.back();
  }
}
