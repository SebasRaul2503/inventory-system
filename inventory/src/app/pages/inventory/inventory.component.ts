import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatCard, MatTableModule, MatCardHeader, MatCardTitle, MatCardContent],
  providers: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  dataSource = []
  displayedColumns = ['id', 'name', 'description', 'price', 'id_ugel', 'category'];
  constructor() { }

  ngOnInit(): void {
    console.log('Componente Inventario cargado');
  }
}
