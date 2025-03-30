import { Component } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [AuthFormComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  submitted = false;

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
