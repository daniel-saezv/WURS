import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoginRequest } from '../../models/auth/login-request.model';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isSubmitting = signal(false);
  private _hasErrors = signal(false);
  private _wasRegistered = signal(false);
  private _isLoggedIn = signal(false);
  private baseUrl = 'https://localhost:8081';

  http: HttpClient = inject(HttpClient);
  errorHandler: ErrorHandlerService = inject(ErrorHandlerService);

  isSubmitting = this._isSubmitting.asReadonly();
  hasErrors = this._hasErrors.asReadonly();
  registered = this._wasRegistered.asReadonly();
  isLoggedIn = this._isLoggedIn.asReadonly();

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

  login(request: LoginRequest) {
    this._isSubmitting.set(true);
    this._hasErrors.set(false);

    const params = new HttpParams().set('useCookies', true);

    this.http
      .post(`${this.baseUrl}/login`, request, { withCredentials: true, params })
      .subscribe({
        next: () => {
          this._isLoggedIn.set(true);
        },
        error: (errorResponse) => {
          this._hasErrors.set(true);
          this.errorHandler.notifyErrors(errorResponse.error);
        },
        complete: () => this._isSubmitting.set(false),
      });
  }
  checkAuth(): Observable<boolean> {
    return this.http
      .get<{
        isAuthenticated: boolean;
      }>(`${this.baseUrl}/manage/info`, { withCredentials: true })
      .pipe(
        map(() => {
          this._isLoggedIn.set(true);
          return true;
        }),
        catchError(() => {
          this._isLoggedIn.set(false);
          return of(false);
        }),
      );
  }
}
