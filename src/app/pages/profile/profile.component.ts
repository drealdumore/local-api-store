import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountDetailsComponent } from 'src/app/components/account-details/account-details.component';
import { AddressBookComponent } from 'src/app/components/address-book/address-book.component';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { LogoutModalComponent } from 'src/app/logout-modal/logout-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AddressBookComponent,
    AccountDetailsComponent,
    BackBtnComponent,
    LogoutModalComponent,
    ModalComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  isAccountDetail: boolean = true;

  user: string = '';
  userEmail: string = '';
  firstLetter: string = '';

  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  public modalService = inject(ModalService);
  private router = inject(Router);

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Profile');

    // Retrieve user information from local storage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser).displayName;
      this.userEmail = JSON.parse(storedUser).email;

      console.log(this.user);
      console.log(this.userEmail);
      console.log(this.firstLetter);

      // to display the first letter of the userEmail.
      this.firstLetter = this.userEmail.charAt(0).toUpperCase();
    }
  }

  openModal() {
    this.modalService.openModal();
  }

  logout() {
    this.authService
      .logOut()
      .then((res: any) => {
        this.toastr.success('Successfully Logged Out.');
        this.router.navigate(['/auth/login']);
      })
      .catch((error: any) => {
        this.toastr.error('error');
      });
  }
}
