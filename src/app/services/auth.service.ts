import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:8081/register';

  constructor(private http: HttpClient) {}

  // Método para registro usando Signals
  register(data: { email: string; password: string; secret: string }) {
    return toSignal(this.http.post(`${this.baseUrl}/register`, data));
  }
}
