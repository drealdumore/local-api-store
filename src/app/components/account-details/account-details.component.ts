import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'account-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  @Output() modalFn = new EventEmitter<any>();
  @Output() passwordModalFn = new EventEmitter<any>();

  @Input() userDetail: any;

  firstLetter: string = '';
  userEmail: string = '';
  isVerfied: boolean = false;

  detailForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      fullName: [''],
      interest: [''],
    });

    this.detailForm.setValue({
      fullName: this.userDetail.name,
      interest: this.userDetail.interest,
    });

    this.userEmail = this.userDetail.email;
    this.isVerfied = this.userDetail.emailConfirm;
    this.firstLetter = this.userEmail.charAt(0).toUpperCase();
  }

  logout() {
    this.modalFn.emit();
  }

  changePassword() {
    this.passwordModalFn.emit();
  }


}
