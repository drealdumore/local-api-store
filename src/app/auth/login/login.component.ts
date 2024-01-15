import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm!: FormGroup;
  errorMessage: string = '';
  loginPasswordMessage: string = '';
  loginEmailMessage: string = '';

  passwordValidationMessages: { [key: string]: string } = {
    required: 'Password is required.',
    minlength: 'Password must be at least 3 characters long.',
    maxlength: 'Password cannot be more than 9 characters long.',
  };

  emailValidationMessages: { [key: string]: string } = {
    required: 'Email address is required.',
    email: 'Please enter a valid email address.',
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get hasError(): boolean {
    return this.loginEmailMessage !== '' || this.loginPasswordMessage !== '';
  }

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
    });

    this.subscribeToPasswordChanges(this.loginForm);
    this.subscribeToEmailChanges(this.loginForm);
  }

  private setPasswordMessage(c: AbstractControl): void {
    this.loginPasswordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.loginPasswordMessage = Object.keys(c.errors)
        .map((key) => this.passwordValidationMessages[key])
        .join(' ');
    }
  }

  private setEmailMessage(c: AbstractControl): void {
    this.loginEmailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.loginEmailMessage = Object.keys(c.errors)
        .map((key) => this.emailValidationMessages[key])
        .join(' ');
    }
  }

  private subscribeToPasswordChanges(form: FormGroup): void {
    const passwordControl = form.get('password');
    if (passwordControl) {
      passwordControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((value) => {
          this.setPasswordMessage(passwordControl);
        });
    }
  }

  private subscribeToEmailChanges(form: FormGroup): void {
    const emailControl = form.get('email');
    if (emailControl) {
      emailControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        this.setEmailMessage(emailControl);
      });
    }
  }

  loginWithEmail() {
    const formValue = Object.assign(this.loginForm.value, {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });

    this.authService
      .login(formValue)
      .then((res: any) => {
        this.toastr.success('Sucessfully logged in');
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        console.error(error);

        if (error.code === 'auth/user-not-found') {
          this.errorMessage =
            'User not found. Please check your email or sign up for an account.';
        } else if (error.code === 'auth/invalid-email') {
          this.errorMessage =
            'Invalid email address. Please enter a valid email.';
        } else if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-credential') {
          this.errorMessage =
            'User not found. Please check your email or sign up for an account.';
        } else {
          this.errorMessage =
            'An error occurred during login. Please try again later.';
        }

        this.toastr.error(this.errorMessage);
      });
  }
}
