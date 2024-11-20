import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlantService } from '../../../services/plant/plant.service';
import { CategoryService } from '../../../services/category/category.service';
import { ExpertService } from '../../../services/expert/expert.service';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent{

  public plantFields = [
    { name: 'common_name', label: 'Nombre común', type: 'text', required: true, minLength: 3, maxLength: 150},
    { name: 'scientific_name', label: 'Nombre científico', type: 'text', required: true, maxLength: 200},
    { name: 'description', label: 'Descripción', type: 'textarea', required: true},
    { name: 'habitat', label: 'Hábitat', type: 'text', required: false, maxLength: 200 },
    { name: 'medicinal_uses', label: 'Usos medicinales', type: 'textarea', required: true },
    { name: 'preparation_method', label: 'Método de preparación', type: 'textarea', required: true },
    { name: 'benefits', label: 'Beneficios', type: 'textarea', required: true},
    { name: 'precautions', label: 'Precauciones', type: 'textarea'},
    { name: 'availability', label: 'Disponibilidad', type: 'textarea', maxLength: 150 },
    { name: 'image', label: 'Imagen', type: 'file', required: true},
    { name: 'experts', label: 'Expertos', type: 'select', required: false, multiple: true},
    { name: 'category_id', label: 'Categoría', type: 'select', required: true},
  ];

  constructor(
    protected ps: PlantService,
    protected cs: CategoryService,
    protected es: ExpertService
  ) {}
}