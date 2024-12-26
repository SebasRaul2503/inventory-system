import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  baseUrl = 'http://localhost:3000'; // api url

  constructor(private http: HttpClient) { }

  getAllItems() {
    const token = sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<{ items: Item[] }>(`${this.baseUrl}/api/items/getItems`, { headers })
      .pipe(
        map((response) => response.items) // Extraemos solo el arreglo de ítems
      );
  }

}
