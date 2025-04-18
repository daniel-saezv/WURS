import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { ToastService } from '../../services/shared/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toastService = inject(ToastService);
  toast = this.toastService.toast;

  isVisible = computed(() => !!this.toast());

  constructor() {
    effect(() => {
      const t = this.toast();
      if (t) console.log(`[Toast]: ${t.type?.toUpperCase()}: ${t.message}`);
    });
  }
}
