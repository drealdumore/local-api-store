import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user: string = '';
  userEmail: string = '';
  firstLetter: string = '';

  constructor() {}

  ngOnInit(): void {
    // Retrieve user information from local storage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser).displayName;
      this.userEmail = JSON.parse(storedUser).email;

      // to display the first letter of the userEmail.
      this.firstLetter = this.userEmail.charAt(0).toUpperCase();
    }
  }
}
