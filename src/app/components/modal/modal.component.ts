import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  private modalService = inject(ModalService);

  close() {
    this.modalService.closeModal();
  }
}
