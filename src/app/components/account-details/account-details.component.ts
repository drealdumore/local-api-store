import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent {
  @Output() modalFn = new EventEmitter<any>();
  @Input() userDetail: any[] = [];
  @Input() firstLetter: string = ''

  logout() {
    this.modalFn.emit();
  }
}
