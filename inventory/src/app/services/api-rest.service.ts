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

  addItem(Item: Item, itemQuantity: Number, userId: Number, token: String) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<{ item: Item }>(`${this.baseUrl}/api/items/addItem`, { item: Item, itemQuantity, userId }, { headers });
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
