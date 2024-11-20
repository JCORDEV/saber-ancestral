import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnChanges{
  @Input() model: any;
  @Input() modalMode: string = 'view';
  @Input() relatedItems: any[] = [];
  @Input() label: string = 'Relacionados';
  @Input() displayField: string = 'name';
  @Output() selectionChanged = new EventEmitter<any[]>();

  searchTerm: string = '';
  selectedItems: any[] = [];

  ngOnInit(): void {
  }
  
  ngOnChanges(): void {
    if (this.modalMode && this.modalMode === 'add') {
      this.relatedItems.forEach(item => item.selected = false);
    }
    
    if (this.modalMode === 'edit') {
      this.selectedItems = this.relatedItems.filter(item => item.selected);
    }
  }

  onSelectionChange(item: any): void {
    item.selected
      ? this.selectedItems.push(item)
      : this.selectedItems = this.selectedItems.filter(e => e.id !== item.id);
    
      // console.log(this.selectedItems)
    this.selectionChanged.emit(this.selectedItems);
  }

  areAllSelected(): boolean {
    return this.relatedItems.every(item => item.selected);
  }

  toggleSelectAll(): void {
    const allSelected = this.areAllSelected();

    this.selectedItems = allSelected ? [] : [...this.relatedItems];
    this.relatedItems.forEach(item => item.selected = !allSelected);
    
    // console.log(this.selectedItems)
    // console.log(this.relatedItems)
    this.selectionChanged.emit(this.selectedItems);
  }
}
