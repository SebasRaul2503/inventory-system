import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { AuditLog } from '../models/audit-log';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  baseUrl = 'http://localhost:3000'; // api url

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllItems() {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<{ items: Item[] }>(`${this.baseUrl}/api/items/getItems`, { headers })
      .pipe(
        map((response) => response.items) // Extraemos solo el arreglo de ítems
      );
  }

  addItem(Item: Item, itemQuantity: Number) {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<{ item: Item }>(`${this.baseUrl}/api/items/addItem`, { item: Item, itemQuantity }, { headers });
  }

  getCategorias() {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ categorias: any[] }>(`${this.baseUrl}/api/list/getCategorias`, { headers })
    .pipe(
        map((response) => response.categorias) // Extraemos solo el arreglo de ítems
      );
}

getDescripciones() {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ descripciones: any[] }>(`${this.baseUrl}/api/list/getDescripciones`, { headers })
    .pipe(
        map((response) => response.descripciones) // Extraemos solo el arreglo de ítems
      );
}

getAmbientes() {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ ambientes: any[] }>(`${this.baseUrl}/api/list/getAmbientes`, { headers })
    .pipe(
        map((response) => response.ambientes) // Extraemos solo el arreglo de ítems
      );
}

getItemById(id: string) {
  const token = this.authService.getToken();
  const headers = { Authorization: `Bearer ${token}` };
  return this.http
    .get<{ item: Item[] }>(`${this.baseUrl}/api/items/getItemById/${id}`, { headers })
    .pipe(
      map((response) => response.item[0]) // Tomamos el primer elemento del arreglo
    );
}


  getAudits() {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<{ audits: AuditLog[] }>(`${this.baseUrl}/api/audit/getAudits`, { headers })
      .pipe(
        map((response) => response.audits) // Extraemos solo el arreglo de ítems
      );
  }

}
