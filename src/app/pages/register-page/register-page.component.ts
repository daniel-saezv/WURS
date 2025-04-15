import { Component, effect, inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { DynamicField } from '../../components/dynamic-form/dynamic-field';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { RegisterRequest } from '../../models/register-request.model';

@Component({
  selector: 'app-register-page',
  imports: [DynamicFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  formFields: DynamicField[] = [
    {
      type: 'email',
      name: 'email',
      label: 'Correo electrónico',
      id: 'email',
      placeholder: 'Introduce tu correo electrónico',
      validators: [Validators.required, Validators.email],
      validationMessages: {
        required: 'El correo es obligatorio.',
        email: 'Formato de correo inválido.',
      },
    },
    {
      type: 'input',
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
    {
      type: 'input',
      id: 'registerPass',
      name: 'registerPass',
      placeholder: 'Introduce tu pase de registro',
      label: 'Pase de registro',
      validators: [Validators.required],
      validationMessages: {
        required: 'El pase de registro es obligatorio',
      },
    },
  ];
  authService: AuthService = inject(AuthService);
  toastService: ToastService = inject(ToastService);

  constructor() {
    effect(() => {
      if (this.authService.registered()) {
        this.toastService.show('Registro exitoso', 'success');
      } else if (this.authService.hasErrors()) {
        this.toastService.show('Error en el registro', 'error');
      }
    });
  }

  handleSubmit(formData: FormGroup) {
    const request: RegisterRequest = {
      email: formData.value.email,
      password: formData.value.password,
    };
    this.authService.register(request, formData.value.registerPass);
  }
}
