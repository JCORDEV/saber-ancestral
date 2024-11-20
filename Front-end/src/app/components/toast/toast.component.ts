import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'primary' | 'danger' = 'success';
  isVisible: boolean = false;

  showToast(message: string, type: 'success' | 'primary' | 'danger' = 'success') {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => this.isVisible = false, 3000);
  }

  hideToast() {
    this.isVisible = false;
  }
}
