import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css'
})
export class FilterOptionsComponent {
  @Input() filter: any[] = [];
  @Output() filterChange = new EventEmitter<{ searchQuery: string; selectedCategoryIds: number[] }>();

  searchQuery: string = '';
  selectedCategoryIds: number[] = [];

  onCategoryChange(categoryId: number, event: any): void {
    if (event.target.checked) {
      this.selectedCategoryIds.push(categoryId);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    }
    this.emitFilterChange();
  }

  onSearchChange(event: any): void {
    this.searchQuery = event.target.value;
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.filterChange.emit({
      searchQuery: this.searchQuery,
      selectedCategoryIds: this.selectedCategoryIds
    });
  }
}
