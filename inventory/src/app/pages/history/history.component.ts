import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { ApiRestService } from '../../services/api-rest.service';
import { AuditLog } from '../../models/audit-log';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatTableModule,
    MatPaginator,
    CommonModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  // Configuración de columnas y datos para la tabla
  displayedColumns = [
    'idMovimiento',
    'descripcionItem',
    'idItem',
    'usuario',
    'idUsuario',
    'fechaMovimiento',
    'detalleMovimiento',
  ];
  dataSource = new MatTableDataSource<AuditLog>();

  // Referencia al paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Variables de estado
  isLoading: boolean = true; // Para mostrar el estado de carga
  hasAccess: boolean = true; // Para verificar si el usuario tiene acceso
  hasError: boolean = false; // Para manejar errores de carga

  constructor(private apiRestService: ApiRestService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Inicia la carga de datos
    this.getAudits();
  }

  getAudits(): void {
    this.apiRestService.getAudits().subscribe({
      next: (data: AuditLog[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        this.hasAccess = true;
        this.hasError = false;
      },
      error: (err) => {
        console.error('Error al cargar datos');
  
        this.isLoading = false;
  
        if (err.status === 403) {
          this.hasAccess = false;
          this.hasError = false;
        } else {
          this.hasAccess = true;
          this.hasError = true;
        }

      },
    });
  }
}
