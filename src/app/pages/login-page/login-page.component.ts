import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { DynamicField } from '../../components/dynamic-form/dynamic-field';
import { RouterModule } from '@angular/router';

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
  ];

  // Método para verificar si un campo es inválido

  // Método para manejar el envío del formulario
  handleSubmit(formData: FormGroup) {
    // Aquí puedes manejar el proceso de login (llamada API, etc.)
    console.log('Form submitted', formData.value);
  }
}
