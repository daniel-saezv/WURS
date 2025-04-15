import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isSubmitting = signal(false);
  private _hasErrors = signal(false);
  private _wasRegistered = signal(false);

  isSubmitting = this._isSubmitting.asReadonly();
  hasErrors = this._hasErrors.asReadonly();
  registered = this._wasRegistered.asReadonly();
  http: HttpClient = inject(HttpClient);
  errorHandler: ErrorHandlerService = inject(ErrorHandlerService);
  private baseUrl = 'https://localhost:8081';

  register(request: RegisterRequest, registerPass: string) {
    this._isSubmitting.set(true);
    this._hasErrors.set(false);

    const headers = { 'User-Create-Secret': registerPass };
    this.http.post(`${this.baseUrl}/register`, request, { headers }).subscribe({
      next: () => this._wasRegistered.set(true),
      error: (errorResponse) => {
        this._hasErrors.set(true);
        this.errorHandler.notifyErrors(errorResponse.error);
      },
      complete: () => this._isSubmitting.set(false),
    });
  }
}
