import { Component, ViewChild } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiRestService } from '../../services/api-rest.service';
import { Item } from '../../models/item';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatCard, MatTableModule, MatCardHeader, MatCardTitle, MatCardContent, MatPaginator],
  providers: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  dataSource = new MatTableDataSource<Item>();
  displayedColumns = ['id', 'descripcion', 'ambiente', 'categoria', 'precio', 'estado'];
  fechaActual = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: "numeric",
  }).format(new Date());
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private apiRestService: ApiRestService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.apiRestService.getAllItems().subscribe((data: Item[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }catch (error) {
      console.log("xs");
    }
  }
}
