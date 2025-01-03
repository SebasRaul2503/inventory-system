import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatCard,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ApiRestService } from '../../services/api-rest.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../models/item';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatCardContent,
    MatInputModule,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  categorias: any[] = [];
  descripciones: any[] = [];
  ambientes: any[] = [];
  descripcionesFiltradas: any[] = [];
  item: Item = {
    idAmbiente: null,
    idCategoria: null,
    idDescripcion: null,
    idUgel: null,
    ambiente: null,
    descripcion: null,
    detalle: null,
    fechaAdquisicion: null,
    fechaIngreso: null,
    imagen: null,
    precio: null,
    estado: null,
    categoria: null,
  };
  itemQuantity: number = 0;

  constructor(private apiRestService: ApiRestService) {
    this.addItemForm = new FormGroup({
      idAmbiente: new FormControl(0, Validators.required),
      idDescripcion: new FormControl({ value: null, disabled: true }, Validators.required),
      detalle: new FormControl('', Validators.required),
      idCategoria: new FormControl(0, Validators.required),
      idUgel: new FormControl(0, Validators.required),
      fechaAdquisicion: new FormControl('', Validators.required),
      precio: new FormControl(0, Validators.required),
      imagen: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      itemQuantity: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
    forkJoin({
      categorias: this.apiRestService.getCategorias(),
      descripciones: this.apiRestService.getDescripciones(),
      ambientes: this.apiRestService.getAmbientes(),
    }).subscribe({
      next: ({ categorias, descripciones, ambientes }) => {
        this.categorias = categorias;
        this.descripciones = descripciones;
        this.ambientes = ambientes;
        // Filtrar descripciones dinámicamente según la categoría seleccionada
        this.addItemForm.get('idCategoria')?.valueChanges.subscribe((idCategoria) => {
          if (idCategoria) {
            this.descripcionesFiltradas = this.descripciones.filter(
              (descripcion) => descripcion.ID_CATEGORIA === idCategoria
            );
            // Habilitar el campo de descripción
            this.addItemForm.get('idDescripcion')?.enable();
          } else {
            // Si no hay categoría seleccionada, deshabilitar el campo de descripción
            this.addItemForm.get('idDescripcion')?.disable();
            this.descripcionesFiltradas = [];
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      },
    });
  }
  
  

  onSubmit() {
    if (this.addItemForm.invalid) {
      // Marcar todos los controles como tocados para mostrar errores
      Object.keys(this.addItemForm.controls).forEach((key) => {
        const control = this.addItemForm.get(key);
        control?.markAsTouched();
      });
      console.log('Formulario no válido');
      return;
    }
  
    // Si es válido, procesar el envío
    this.item.idAmbiente = this.addItemForm.value.idAmbiente;
    this.item.idCategoria = this.addItemForm.value.idCategoria;
    this.item.idDescripcion = this.addItemForm.value.idDescripcion;
    this.item.idUgel = this.addItemForm.value.idUgel;
    this.item.ambiente = this.addItemForm.value.ambiente;
    this.item.descripcion = this.addItemForm.value.descripcion;
    this.item.detalle = this.addItemForm.value.detalle;
    this.item.fechaAdquisicion = this.addItemForm.value.fechaAdquisicion.toISOString().split('T')[0];
    this.item.precio = this.addItemForm.value.precio;
    this.item.imagen = this.addItemForm.value.imagen;
    this.item.estado = this.addItemForm.value.estado;
    this.item.fechaIngreso = new Date().toISOString();
    this.itemQuantity = this.addItemForm.value.itemQuantity;
  
    console.log('item: ', this.item);
    console.log('itemQuantity: ', this.itemQuantity);
  }
  

}
