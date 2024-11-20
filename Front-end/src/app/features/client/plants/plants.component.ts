import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { PlantService } from '../../../services/plant/plant.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent {
  public plants: any[] = [];
  public plant: any = {};
  public categories:any[] = [];
  public experts: any[] = [];

  public total: any;
  public offset: any;
  public limit: any;
  public currentPage: any;
  public lastPage: any;
  public pages: number[] = [];

  public selectedCategoryIds: number[] = [];
  public searchQuery: string = '';

  fields = [
    { label: 'Nombre científico', key: 'scientific_name' },
    { label: 'Descripción', key: 'description' },
    { label: 'Habitat', key: 'habitat' },
    { label: 'Usos medicinales', key: 'medicinal_uses' },
    { label: 'Preparación', key: 'preparation_method' },
    { label: 'Beneficios', key: 'benefits' },
    { label: 'Precauciones', key: 'precautions' },
    { label: 'Disponibilidad', key: 'availability' },
    { label: 'Familia', key: 'category' }
  ];

  constructor(
    private ps: PlantService,
    private cs: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadPlants();
    this.loadCategories();
  }

  loadPlants(page: number = 1){
    let Plants = this.ps.getPagination(page, 10, this.selectedCategoryIds, this.searchQuery).subscribe({
      next: (response) => {
        this.plants = response.data;        // Almacena las plantas en el componente
        this.total = response.total;          // Almacena el total de registros
        this.offset = response.offset;          // Almacena el total de registros
        this.limit = response.limit;          // Almacena el total de registros
        this.currentPage = response.page;     // Almacena la página actual
        this.lastPage = response.lastPage;    // Almacena la última página
        
        // Genera un array de números de página
        this.pages = Array.from({ length: this.lastPage }, (_, i) => i + 1);
      },
      error: (err) => console.error('Error loading plants', err),
    });
  }

  loadCategories(){
    this.cs.getData().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error loading categories', err),
    });
  }

  view(id: number){
    this.getPlantId(id);
  }

  getPlantId(id: number): void {
    this.ps.getById(id).subscribe({
      next: (data) => {
        this.plant = data ;
      },
      error: (err) => console.error('Error getting plant', err),
    });
  }

  onFilterChange(filterData: { searchQuery: string; selectedCategoryIds: number[] }): void {
    this.searchQuery = filterData.searchQuery;
    this.selectedCategoryIds = filterData.selectedCategoryIds;
    this.loadPlants();
  }
}
