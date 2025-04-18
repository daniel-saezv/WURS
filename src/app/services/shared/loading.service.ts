import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount = signal(0);

  readonly isLoading = computed(() => this.loadingCount() > 0);

  show() {
    this.loadingCount.set(this.loadingCount() + 1);
  }

  hide() {
    this.loadingCount.set(Math.max(0, this.loadingCount() - 1));
  }

  reset() {
    this.loadingCount.set(0);
  }
}
