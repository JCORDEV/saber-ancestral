import { Component } from '@angular/core';
import { ExpertService } from '../../../services/expert/expert.service';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrl: './experts.component.css'
})
export class ExpertsComponent {
  public experts: any[] = [];

  public total: any;
  public offset: any;
  public limit: any;
  public currentPage: any;
  public lastPage: any;
  public pages: number[] = [];

  constructor(
    private es: ExpertService
  ) {}

  ngOnInit(): void {
    this.loadExperts();
  }

  loadExperts(page: number = 1){
    let Experts = this.es.getPagination(page).subscribe({
      next: (response) => {
        this.experts = response.data;        // Almacena las plantas en el componente
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
}
