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

export function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('password')?.value;
  const passwordConfirm = c.get('passwordConfirm')?.value;

  if (password.pristine === passwordConfirm) {
    return null;
  }

  if (password === passwordConfirm) {
    return null;
  }

  return { match: true };
}

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
  nameMessage: string = '';

  passwordValidationMessages: { [key: string]: string } = {
    required: 'Password is required.',
    minlength: 'Password must be at least 3 characters long.',
    maxlength: 'Password cannot be more than 9 characters long.',
  };

  emailValidationMessages: { [key: string]: string } = {
    required: 'Email address is required.',
    email: 'Please enter a valid email address.',
  };

  nameValidationMessages: { [key: string]: string } = {
    required: 'Name is required.',
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get hasError(): boolean {
    return (
      this.nameMessage !== '' ||
      this.EmailMessage !== '' ||
      this.PasswordMessage !== '' ||
      this.PasswordMatchMessage !== ''
    );
  }

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    localStorage.removeItem('user');

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(12),
            ],
          ],
          passwordConfirm: ['', Validators.required],
        },
        { validator: passwordMatcher }
      ),
    });

    this.subscribeToPasswordChanges(this.registerForm);
    this.subscribeToEmailChanges(this.registerForm);
    this.subscribeToPasswordMatchChanges(this.registerForm);
    this.subscribeToNameChanges(this.registerForm);
  }

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
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
    const passwordControl = this.registerForm.get('passwordGroup.password');
    const passwordMatchControl = this.registerForm.get(
      'passwordGroup.passwordConfirm'
    );

    const match = passwordControl?.value === passwordMatchControl?.value;

    this.PasswordMatchMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.PasswordMatchMessage = match ? '' : 'Passwords do not match';
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

  private setNameMessage(c: AbstractControl): void {
    this.nameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.nameMessage = Object.keys(c.errors)
        .map((key) => this.nameValidationMessages[key])
        .join(' ');
    }
  }

  private subscribeToNameChanges(form: FormGroup): void {
    const nameControl = form.get('name');
    if (nameControl) {
      nameControl.valueChanges.pipe(debounceTime(200)).subscribe(() => {
        this.setNameMessage(nameControl);
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

  private subscribeToPasswordChanges(form: FormGroup): void {
    const passwordControl = form.get('passwordGroup.password');
    if (passwordControl) {
      passwordControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((value) => {
          this.setPasswordMessage(passwordControl);
        });
    }
  }

  private subscribeToPasswordMatchChanges(form: FormGroup): void {
    const passwordMatchControl = form.get('passwordGroup.passwordConfirm');
    if (passwordMatchControl) {
      passwordMatchControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(() => {
          this.setPasswordMatchMessage(passwordMatchControl);
        });
    }
  }

  registerWithEmail(): void {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.passwordGroup.password;
    const passwordConfirm =
      this.registerForm.value.passwordGroup.passwordConfirm;

    this.authService.register(name, email, password, passwordConfirm).subscribe(
      (response) => {
        // Assuming the user data is available in the response
        this.toastr.success('Sucessfully logged in');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('POST request failed:', error);
        this.toastr.error(error.message);
      }
    );
  }
}
