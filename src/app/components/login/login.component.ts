import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  submitted = false;

  constructor() {
  }

  // Método para verificar si un campo es inválido
  get f() {
    return this.form.controls;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    // Detener la ejecución si el formulario es inválido
    if (this.form.invalid) {
      return;
    }

    // Aquí puedes manejar el proceso de login (llamada API, etc.)
    console.log('Form submitted', this.form.value);
  }
}
