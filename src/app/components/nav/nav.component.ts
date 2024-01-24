import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
  truncatedUserEmail: string = '';

  // ngOnInit(): void {
  // Retrieve user information from local storage
  // const storedUser = localStorage.getItem('userData');
  // if (storedUser) {
  //   const userId = JSON.parse(storedUser).userId;
  //   const userKey = `userData_${userId}`;

  //   const userData = localStorage.getItem(userKey);
  //   console.log(userData);

  //   if (userData) {
  //     this.user = JSON.parse(userData).user.name;
  //     this.userEmail = JSON.parse(userData).user.email;

  //     // to display the first letter of the userEmail.
  //     this.firstLetter = this.userEmail.charAt(0).toUpperCase();

  //     // Truncate userEmail if it's more than 9 characters
  //     this.truncatedUserEmail =
  //       this.userEmail.length > 20
  //         ? this.userEmail.substring(0, 17) + '...'
  //         : this.userEmail;
  //   }
  // }

  ngOnInit(): void {
    // Retrieve user information from local storage
    const storedUser = localStorage.getItem('userData');
    console.log(storedUser);

    if (storedUser) {
      this.user = JSON.parse(storedUser).user.name;
      this.userEmail = JSON.parse(storedUser).user.email;

      // to display the first letter of the userEmail.
      this.firstLetter = this.userEmail.charAt(0).toUpperCase();

      // Truncate userEmail if it's more than 9 characters
      this.truncatedUserEmail =
        this.userEmail.length > 20
          ? this.userEmail.substring(0, 17) + '...'
          : this.userEmail;
    }
  }
}
