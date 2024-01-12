import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountDetailsComponent } from 'src/app/components/account-details/account-details.component';
import { AddressBookComponent } from 'src/app/components/address-book/address-book.component';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AddressBookComponent, AccountDetailsComponent, BackBtnComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isAccountDetail: boolean = false;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Profile');
  }
}
