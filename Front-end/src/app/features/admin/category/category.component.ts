import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent{

  public categoryFields = [
    // { name: 'id'},
    { name: 'name', label: 'Nombre', type: 'text', required: true, minLength: 3 }
  ];

  constructor(
    public cs: CategoryService
  ) {}
}
