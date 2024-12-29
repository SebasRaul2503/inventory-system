import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../models/item';
import { MatCardHeader, MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatCardContent,
    MatInputModule,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  addItemForm: FormGroup;

  constructor() {
    this.addItemForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      ambiente: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.addItemForm.value);
  }
}
