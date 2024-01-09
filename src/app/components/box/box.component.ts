import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from '../star/star.component';
import { BackBtnComponent } from '../back-btn/back-btn.component';

@Component({
  selector: 'box',
  standalone: true,
  imports: [CommonModule, StarComponent,BackBtnComponent],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
}
