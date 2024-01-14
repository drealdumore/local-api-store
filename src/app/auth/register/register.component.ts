import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  registerForm!: FormGroup;
  errorMessage: string = '';
  PasswordMessage: string = '';
  EmailMessage: string = '';

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
    return this.EmailMessage !== '' || this.PasswordMessage !== '';
  }

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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

    this.subscribeToPasswordChanges(this.registerForm);
    this.subscribeToEmailChanges(this.registerForm);
  }

  private setPasswordMessage(c: AbstractControl): void {
    this.PasswordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.PasswordMessage = Object.keys(c.errors)
        .map((key) => this.passwordValidationMessages[key])
        .join(' ');
    }
  }

  private setEmailMessage(c: AbstractControl): void {
    this.EmailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.EmailMessage = Object.keys(c.errors)
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

  registerWithEmail() {
    const formValue = Object.assign(this.registerForm.value, {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    });

    this.authService
      .register(formValue)
      .then((res: any) => {
        this.toastr.success('Sucessfully registered');
      })
      .catch((error: any) => {
        console.error(error);
        this.toastr.error(this.errorMessage);

        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage =
            'Email address is already in use. Please choose another.';
        } else if (error.code === 'auth/invalid-email') {
          this.errorMessage =
            'Invalid email address. Please enter a valid email.';
        } else if (error.code === 'auth/weak-password') {
          this.errorMessage = 'Weak password. Please use a stronger password.';
        } else {
          this.errorMessage =
            'An error occurred during registration. Please try again later.';
        }
      });
  }
}
