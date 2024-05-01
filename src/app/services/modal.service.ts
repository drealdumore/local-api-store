import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  // modalObservable = new BehaviorSubject<boolean>(false);
  // modalState$ = this.modalObservable.asObservable();
  
  modalSignal = signal<boolean>(false)
  observeModal$ = toObservable(this.modalSignal)
  
  openModal() {
    // this.modalObservable.next(true);
    this.modalSignal.set(true)
  }

  closeModal() {
    // this.modalObservable.next(false);
    this.modalSignal.set(false)
  }
}
