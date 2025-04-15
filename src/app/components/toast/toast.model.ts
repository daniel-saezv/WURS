export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  message: string;
  type?: ToastType;
  msDuration?: number;
}
