import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> {
  @Input() title: string = ''
  @Input() fields: any[] = [];
  @Input() dataService!: DataService<T>;
  @Input() folderImage: string = '';
  @Input() primaryKey: string = 'name';
  @Input() relatedServices!: { key: string; service: DataService<any> }[];
  public data: any[] = [];                 // Los datos (pueden ser plantas, expertos, categorías, etc.)
  public relatedData: any = {};
  public item: any = {};
  public total: number = 1;     // Los nombres de los campos a mostrar en las columnas
  public offset: number = 1;     // Los nombres de los campos a mostrar en las columnas
  public limit: number = 1;     // Los nombres de los campos a mostrar en las columnas
  public currentPage: number = 1;           // Página actual
  public lastPage: number = 1;              // Última página
  public pages: number[] = [];
  public keysCount: number = 0;
  public modalMode: string = 'view';

  ngOnInit() {
    this.loadData(); // Cargar datos al inicializar el componente
    this.loadRelatedData();
  }

  loadData(page: number = 1): void {
    this.dataService?.getPagination(page).subscribe({
      next: (response: any) => {
        this.data = response.data; // Update to reflect generic structure
        this.total = response.total;
        this.offset = response.offset;
        this.limit = response.limit;
        this.currentPage = response.page;
        this.lastPage = response.lastPage;

        // Generate an array of page numbers
        this.pages = Array.from({ length: this.lastPage }, (_, i) => i + 1);
        if (this.data.length > 0) {
          this.keysCount = Object.keys(this.data[0]).length;
        }
      },
      error: (err: any) => console.error('Error loading items', err),
    });
  }

  loadRelatedData() {
    this.relatedServices.forEach(({ key, service }) => {
      service.getData().subscribe(
        (data) => {
          this.relatedData[key] = data.map((item: any) => ({ ...item, selected: false }));
          // console.log(key)
          // console.log(this.relatedData)
        },
        (error) => console.error(`Error cargando datos para ${key}`, error)
      );
    });
    // console.log(this.relatedData)
  }

  add(): void {
    this.openModal('add');
  }
  
  view(id: number): void {
    this.openModal('view');
    this.getById(id);
    // this.markAssociatedExperts()
    // console.log('Nuevo item:', this.relatedData);
  }

  edit(id: number): void {
    this.openModal('edit');
    this.getById(id);
  }

  delete(id: number): void {
    this.openModal('delete');
    this.getById(id);
  }

  getById(id: number): void {
    // console.log(this.dataService.getById(id));
    this.dataService.getById(id).subscribe(
      {
        next: (data) => {
          this.item = data ;
          this.markAllAssociatedItems();
          
        },
        error: (err) => console.error('Error al obtener item', err),
      }
    );
  }

  
  
  getNestedProperty(item: any, field: string): any {
    return field.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, item);
  }

  openModal(mode: string): void{
    this.modalMode = mode;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    if (mode === 'add') {
      this.item = {};
      // this.selectedItems = [];
    }else{
      Object.keys(this.relatedData).forEach((key) => {
        this.relatedData[key].forEach((item: any) => {
          item.selected = false;
        });
      });
    }
  }

  markAllAssociatedItems(): void {
    // Iterar sobre todas las claves en `relatedData`
    Object.keys(this.relatedData).forEach((key) => {
      const isMultiple = Array.isArray(this.item[key]);
      this.markAssociatedItems(key, isMultiple);
    });
  }

  markAssociatedItems(fieldName: string, isMultiple: boolean): void {
    // Limpiar selección previa en `relatedData`
    // this.relatedData[fieldName]?.forEach((item: any) => {
    //   item.selected = false;
    // });

    if (isMultiple && Array.isArray(this.item[fieldName])) {
      // Relación múltiple: marcar items en `relatedData`
      this.relatedData[fieldName]?.forEach((relatedItem: any) => {
        const isAssociated = this.item[fieldName].some((related: any) => related.id === relatedItem.id);
        relatedItem.selected = isAssociated;
      });
    } else if (!isMultiple && this.item?.[fieldName]) {
      // Relación unitaria: marcar item en `relatedData`
      const associatedItemId = this.item[fieldName].id;
      this.relatedData[fieldName]?.forEach((relatedItem: any) => {
        relatedItem.selected = (relatedItem.id === associatedItemId);
      });
      // console.log(this.relatedData);
    }
  }
}
