import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { DynamicField } from '../../components/dynamic-form/dynamic-field';

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
      label: 'Correo',
      id: 'email',
      placeholder: 'Introduce tu email',
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
      id: 'register-pass',
      name: 'register-pass',
      placeholder: 'Introduce tu pase de registro',
      label: 'Pase de registro',
      validators: [Validators.required],
      validationMessages: {
        required: 'El pase de registro es obligatorio',
      },
    },
  ];
  form!: FormGroup;

  handleSubmit(formData: FormGroup) {
    // Aquí puedes manejar el proceso de login (llamada API, etc.)
    console.log('Form submitted', formData.value);
  }
}
