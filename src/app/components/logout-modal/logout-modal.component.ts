import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'logout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css'],
  // providers: [ModalService],
})
export class LogoutModalComponent {
  private modalService = inject(ModalService);
  @Output() logOutFn = new EventEmitter();

  close() {
    this.modalService.closeModal();
    
  }

  logOut() {
    this.logOutFn.emit();
  }
}
