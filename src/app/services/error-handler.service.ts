import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { ErrorResponse } from '../models/error-response.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  toast: ToastService = inject(ToastService);

  notifyErrors(errorResponse: ErrorResponse): void {
    if (errorResponse.errors) {
      const errors = errorResponse.errors;
      const errorMessages = Object.values(errors).flat().join('\n');
      this.toast.show(errorMessages, 'error', 10000);
    } else {
      this.toast.show('Ocurrió un error inesperado', 'error');
    }
  }
}
