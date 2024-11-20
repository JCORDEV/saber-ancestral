import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.css'
})
export class ModalClientComponent {
  @Input() title: string = '';
  @Input() data: any = {};
  @Input() imageSrc: string = '';
  @Input() fields: { label: string, key: string }[] = [];
}
