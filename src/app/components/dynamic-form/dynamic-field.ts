import { ValidatorFn } from '@angular/forms';
import { DynamicOption } from './dynamic-option';

export interface DynamicField {
  type: 'input' | 'select' | 'checkbox' | 'textarea' | 'email';
  name: string;
  label: string;
  id: string;
  value?: any;
  options?: DynamicOption[];
  validators?: ValidatorFn[];
  placeholder?: string;
  validationMessages?: {
    [errorKey: string]: string;
  };
}
