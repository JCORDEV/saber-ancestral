import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from '../../../services/expert/expert.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrl: './expert.component.css'
})
export class ExpertComponent {

  expertFields = [
    { name: 'name', label: 'Nombre', type: 'text', required: true},
    { name: 'expertise_area', label: 'Especialización', type: 'textarea', required: true},
    { name: 'contact', label: 'Contacto', type: 'number', required: false},
    { name: 'image', label: 'Foto', type: 'file', required: true},
  ];

  constructor(protected es: ExpertService) {}
}
