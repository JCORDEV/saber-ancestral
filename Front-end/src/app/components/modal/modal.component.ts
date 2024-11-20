import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent<T> {
  @Input() title: string = '';
  @Input() folderImage: string = '';
  @Input() modalMode: string = 'view';
  @Input() model: any = {};
  @Input() fields: any[] = [];
  @Input() relatedItems: any[] = [];
  @Input() primaryKey: string = 'id';
  @Input() dataService!: DataService<T>;
  @Input() relatedData:any = {};
  @Output() selectedFile = new EventEmitter<File>();
  @Output() loadData = new EventEmitter<any>();
  
  public modelForm!: FormGroup;
  public searchTerm: string = '';
  public selectedRelatedItems: any[] = [];
  public selectedImageUrl: string | ArrayBuffer | null = null;

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(private formBuilder: FormBuilder) {
    this.modelForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.modelForm.patchValue({ image: null });
    const formGroupConfig: { [key: string]: FormControl } = {};

    this.fields.forEach(field => {
      const validations = this.getFieldValidators(field);
      formGroupConfig[field.name] = new FormControl(
        this.model[field.name] || null,
        validations
      );
    });

    this.modelForm = this.formBuilder.group(formGroupConfig);
  }

  ngOnChanges(): void {
    this.selectedImageUrl = null;
    if (this.modalMode === 'add') {
      this.modelForm.reset({});

    } else {
      // this.modelForm.reset({});
      // this.selectedImageUrl = null;
      // console.log(this.model)
      this.modelForm.patchValue(this.model);
    }
    this.modalMode !== 'view' ? this.stateFormControls(1): this.stateFormControls(0);
    
  }

  getFieldValidators(field: any) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.type === 'email') {
      validators.push(Validators.email);
    }
    if (field.type === 'number') {
      validators.push(Validators.pattern("^[0-9]*$"));
    }

    if (field.type === 'file' && field.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  onSave(): void {
    if (!this.dataService) {
      console.error('dataService no está definido');
      return;
    }
    if (this.modelForm.valid) {
      let formData: FormData | any;

      if (this.model.image && this.model.image instanceof File) {
        formData = new FormData();

        for (const key in this.modelForm.value) {
          formData.append(key, this.modelForm.value[key]);
        }
      } else {
        formData = this.modelForm.value;
      }

      if (this.modalMode === 'add') {
        this.dataService.add(formData).subscribe(
          (response: any) => {
            this.selectedRelatedItems.forEach((expert:any) => {
                this.dataService.addExpert?.(response.id, expert.id).subscribe();
            });
            this.loadData.emit();
            this.closeModal();
            this.toastComponent.showToast('Elemento agregado correctamente', 'success');
          },
          (err) => {
            if (err.error && err.error.message) {
              this.toastComponent.showToast(`Error: ${err.error.message.toLowerCase()}`, 'danger');
            } else {
              this.toastComponent.showToast('Error al agregar', 'danger');
            }
          }
        );
      } else if (this.modalMode === 'edit') {
        console.log(this.selectedRelatedItems)
        this.dataService.update(this.model.id, formData).subscribe(
          () => {

            const selectedExpertIds = this.selectedRelatedItems
            .filter((expert) => expert.selected)
            .map((expert) => expert.id);

            console.log(this.selectedRelatedItems)
            console.log(selectedExpertIds)

            if (selectedExpertIds.length === 0) {
              this.dataService.updateExpert?.(this.model.id, []).subscribe(
                () => { },
                (err) => {
                  console.error('Error al actualizar expertos:', err);
                }
              );
            } else {
              this.dataService.updateExpert?.(this.model.id, selectedExpertIds).subscribe(
                () => { },
                (err) => {
                  console.error('Error al actualizar expertos:', err);
                }
              );
            }

            this.loadData.emit();
            this.closeModal();
            this.toastComponent.showToast('Elemento actualizado correctamente', 'success');
          },
          (err) => {
            if (err.error && err.error.message) {
              this.toastComponent.showToast(`Error: ${err.error.message.toLowerCase()}`, 'danger');
            } else {
              this.toastComponent.showToast('Error al agregar', 'danger');
            }
          }
        );
      }
    } else {
      // console.log('Formulario inválido');
      this.toastComponent.showToast('Formulario inválido', 'danger');
    }
  }

  onDelete() {
    this.dataService.delete(this.model.id).subscribe(
      () => {
        this.loadData.emit();
        this.closeModal();
        this.toastComponent.showToast('Se ha sido eliminado correctamente.', 'danger');
      },
      (err) => {
        // console.error('Error al agregar', err)
        if (err.error && err.error.message) {
          this.toastComponent.showToast(`Error: ${err.error.message.toLowerCase()}`, 'danger');
        } else {
          this.toastComponent.showToast('Error al eliminar', 'danger');
        }
      }
    );
  }

  getModalTitle(): string {
    if (!this.modelForm) return '';
    switch (this.modalMode) {
      case 'add':
        return 'Agregar ' +  this.title.toLowerCase();
      case 'edit':
      case 'view':
        return this.modalMode === 'edit' ? 'Editar ' + this.title.toLowerCase() : 'Vista completa';
  
      case 'delete':
        return 'Eliminar ' + this.title.toLowerCase();
  
      default:
        return '';
    }
  }

  stateFormControls(state:number){
    Object.keys(this.modelForm.controls).forEach(controlName => {
      state === 0 ?
      this.modelForm.get(controlName)?.disable() :
      this.modelForm.get(controlName)?.enable()
    });
  }
  onSelectionChanged(selectedItems: any[]): void {
    this.selectedRelatedItems = selectedItems;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.modelForm.patchValue({ image: file });
      this.model.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.modelForm.patchValue({ image: null });
      this.model.image = null;
      this.selectedImageUrl = null;
    }
  }

  closeModal(){
    var myModal = document.getElementById('exampleModal');
    var backdrop = document.querySelector('.modal-backdrop');
    
    if (myModal && backdrop) {
      myModal.style.display = 'none';
      backdrop.parentNode?.removeChild(backdrop);
    }
    document.body.style.overflow = 'auto';
  }

}
