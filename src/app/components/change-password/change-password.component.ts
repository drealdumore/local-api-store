import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatcher } from 'src/app/auth/register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'change-password-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  changeForm!: FormGroup;

  @Output() emitFn = new EventEmitter();

  private modalService = inject(ModalService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmVisibility() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  ngOnInit(): void {
    this.changeForm = this.fb.group({
      oldPassword: ['', Validators.maxLength(10)],
      passwordConfirm: this.fb.group(
        {
          newPassword: ['', Validators.maxLength(10)],
          confirmPassword: ['', Validators.maxLength(10)],
        },
        { validator: passwordMatcher }
      ),
    });
  }

  close() {
    this.modalService.closeModal();
  }

  changePassword() {
    const oldPassword = this.changeForm.value?.oldPassword;
    const newPassword = this.changeForm.value?.oldPassword;
    const confirmPassword = this.changeForm.value?.confirmPassword;
    this.authService
      .changePassword(oldPassword, newPassword, confirmPassword)
      .subscribe(
        () => {
          this.modalService.closeModal();
          this.toastr.success('Password Changed Successfully.');
        },
        (error) => {
          this.toastr.error('error');
        }
      );
  }
}
