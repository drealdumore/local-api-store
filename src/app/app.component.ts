import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = this.checkLoginStatus();
  }

  private checkLoginStatus(): boolean {
    // Retrieve user data from local storage
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');

    // Check if both token and user data exist
    return !!userToken && !!userData;
  }
}
