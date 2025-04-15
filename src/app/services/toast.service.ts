import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../components/toast/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toast = signal<ToastMessage | null>(null);
  toast = this._toast.asReadonly();

  show(message: string, type: ToastMessage['type'] = 'info', msDuration = 3000) {
    this._toast.set({ message, type, msDuration });

    setTimeout(() => this._toast.set(null), msDuration);
  }

  clear() {
    this._toast.set(null);
  }
}
