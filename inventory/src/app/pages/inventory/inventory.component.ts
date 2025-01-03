import { Component, ViewChild } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiRestService } from '../../services/api-rest.service';
import { Item } from '../../models/item';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MatCard,
    MatTableModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatPaginator,
    MatIcon,
  ],
  providers: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  dataSource = new MatTableDataSource<Item>();
  displayedColumns = [
    'id',
    'descripcion',
    'ambiente',
    'categoria',
    'precio',
    'estado',
    'acciones',
  ];
  fechaActual = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiRestService: ApiRestService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.apiRestService.getAllItems().subscribe((data: Item[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.log('xs');
    }
  }

  onEdit(id: string) {
    this.router.navigate(['/home/inventario/item/' + id]);
  }
}
