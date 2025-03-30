import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  @Input() form!: FormGroup;
  @Input() buttonText = 'Enviar';
  @Input() logoUrl = '';
  @Output() formSubmit = new EventEmitter<void>(); // Emite el evento de envío

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }
}
