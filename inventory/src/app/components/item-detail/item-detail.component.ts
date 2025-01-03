import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { Item } from '../../models/item';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardModule
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit {
  id: string = '';
  item: Item = {
    idAmbiente: 0,
    idDescripcion: 0,
    detalle: '',
    idCategoria: 0,
    idUgel: 0,
    fechaAdquisicion: '',
    precio: 0,
    fechaIngreso: '',
    imagen: '',
    estado: '', 
  }; // Replace `any` with a proper interface/type if available
  constructor(private route: ActivatedRoute, private apiRestService: ApiRestService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.getItemById();
    } else {
      console.error('Invalid or missing ID parameter.');
    }
  }

  getItemById(): void {
    this.apiRestService
      .getItemById(this.id)
      .subscribe(
        (item) => {
          this.item = item;
          console.log('Item fetched:', item);
        },
        (error) => {
          console.error('Error fetching item:', error);
        }
      );
  }
}
