import { Component, inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { DynamicField } from '../../components/dynamic-form/dynamic-field';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../models/auth/login-request.model';

@Component({
  selector: 'app-login-page',
  imports: [DynamicFormComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  formFields: DynamicField[] = [
    {
      type: 'email',
      name: 'email',
      label: 'Correo Electrónico',
      id: 'email',
      placeholder: 'Introduce tu correo electrónico',
      validators: [Validators.required, Validators.email],
      validationMessages: {
        required: 'El correo es obligatorio.',
        email: 'Formato de correo inválido.',
      },
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: 'Introduce tu contraseña',
      label: 'Contraseña',
      validators: [Validators.required, Validators.minLength(6)],
      validationMessages: {
        required: 'La contraseña es obligatoria.',
        minlength: 'Debe tener al menos 6 caracteres.',
      },
    },
  ];

  authService: AuthService = inject(AuthService);

  handleSubmit(formData: FormGroup) {
    const request: LoginRequest = {
      email: formData.get('email')?.value,
      password: formData.get('password')?.value,
    };
    this.authService.login(request);
  }
}
