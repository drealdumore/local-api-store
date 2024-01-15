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
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

const noSpaceValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value && control.value.trim().includes(' ')) {
    return { noSpace: true };
  }
  return null;
};

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
  PasswordMatchMessage: string = '';
  EmailMessage: string = '';
  NicknameMessage: string = '';

  passwordValidationMessages: { [key: string]: string } = {
    required: 'Password is required.',
    minlength: 'Password must be at least 3 characters long.',
    maxlength: 'Password cannot be more than 9 characters long.',
  };

  emailValidationMessages: { [key: string]: string } = {
    required: 'Email address is required.',
    email: 'Please enter a valid email address.',
  };

  nicknameValidationMessages: { [key: string]: string } = {
    required: 'Nickname is required.',
    maxlength: 'Nickname cannot be more than 10 characters long.',
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
  private router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickName: [
        '',
        [Validators.required, Validators.maxLength(10), noSpaceValidator],
      ],
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
    this.subscribeToNicknameChanges(this.registerForm);
    this.subscribeToPasswordMatchChanges(this.registerForm);
  }

  get nickName(): AbstractControl | null {
    return this.registerForm.get('nickName');
  }

  setNickname() {
    const newNickname = this.registerForm.get('nickName')?.value;

    if (this.registerForm.get('nickName')?.valid && newNickname.trim() !== '') {
      this.authService
        .setDisplayName(newNickname)
        .then(() => {
          console.log('Display name set successfully');
          console.log(newNickname);
        })
        .catch((error) => {
          console.error('Error setting display name:', error);
        });
    }
  }

  private setPasswordMessage(c: AbstractControl): void {
    this.PasswordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.PasswordMessage = Object.keys(c.errors)
        .map((key) => this.passwordValidationMessages[key])
        .join(' ');
    }
  }

  private setPasswordMatchMessage(c: AbstractControl): void {
    const passwordControl = this.registerForm.get('password');
    const passwordMatchControl = this.registerForm.get('confirmPassword');

    const match = passwordControl?.value === passwordMatchControl?.value;

    this.PasswordMatchMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.PasswordMatchMessage = this.PasswordMatchMessage = match
        ? ''
        : 'Passwords do not match';
      console.log('Passwords do not match');
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

  private setNickNameMessage(c: AbstractControl): void {
    this.NicknameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.NicknameMessage = Object.keys(c.errors)
        .map((key) => this.nicknameValidationMessages[key])
        .join(' ');
    }
  }

  private subscribeToPasswordChanges(form: FormGroup): void {
    const passwordControl = form.get('password');
    if (passwordControl) {
      passwordControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((value) => {
          this.setPasswordMessage(passwordControl);
        });
    }
  }

  private subscribeToPasswordMatchChanges(form: FormGroup): void {
    const passwordMatchControl = form.get('confirmPassword');
    if (passwordMatchControl) {
      passwordMatchControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(() => {
          this.setPasswordMatchMessage(passwordMatchControl);
        });
    }
  }

  private subscribeToEmailChanges(form: FormGroup): void {
    const emailControl = form.get('email');
    if (emailControl) {
      emailControl.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
        this.setEmailMessage(emailControl);
      });
    }
  }

  private subscribeToNicknameChanges(form: FormGroup): void {
    const nickNameControl = form.get('nickName');
    if (nickNameControl) {
      nickNameControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((value) => {
          this.setNickNameMessage(nickNameControl);
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
        this.router.navigate(['/home']);
        this.setNickname();
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

// ngOnInit(): void {
//   this.registerForm = this.fb.group(
//     {
//       email: ['', [Validators.required, Validators.email]],
//       nickName: ['', [Validators.required, Validators.maxLength(10)]],
//       password: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(3),
//           Validators.maxLength(12),
//         ],
//       ],
//       confirmPassword: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(3),
//           Validators.maxLength(12),
//         ],
//       ],
//     },
//     { validator: passwordMatchValidator }
//   );

//   this.subscribeToPasswordChanges(this.registerForm);
//   this.subscribeToEmailChanges(this.registerForm);
//   this.subscribeToNicknameChanges(this.registerForm);
//   this.subscribeToPasswordMatchChanges(this.registerForm);
// }
