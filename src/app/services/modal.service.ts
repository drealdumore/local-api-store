import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalObservable = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalObservable.asObservable();

  openModal() {
    this.modalObservable.next(true);
  }

  closeModal() {
    this.modalObservable.next(false);
  }
}
