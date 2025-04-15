import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DynamicField } from './dynamic-field';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: DynamicField[] = [];
  @Input() buttonText: string = 'Enviar';
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  ngOnInit() {
    const group: any = {};
    this.fields.forEach((field) => {
      group[field.name] = new FormControl(
        field.value || '',
        field.validators || [],
      );
    });
    this.form = new FormGroup(group);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorMessage(field: DynamicField): string | null {
    const control = this.form.get(field.name);
    if (control && control.errors && control.touched) {
      const errors = control.errors;
      for (const errorKey in errors) {
        if (field.validationMessages?.[errorKey]) {
          return field.validationMessages[errorKey];
        }
      }
      return 'Campo inválido';
    }
    return null;
  }
}
