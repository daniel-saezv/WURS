import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';

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
  private baseUrl = 'https://localhost:8081';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest, registerPass: string) {
    this._isSubmitting.set(true);
    this._hasErrors.set(false);

    const headers = { 'User-Create-Secret': registerPass };
    this.http.post(`${this.baseUrl}/register`, request, { headers }).subscribe({
      next: () => this._wasRegistered.set(true),
      error: () => this._hasErrors.set(true),
      complete: () => this._isSubmitting.set(false),
    });
  }
}
