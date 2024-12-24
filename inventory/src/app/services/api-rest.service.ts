import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  baseUrl = 'http://localhost:3000'; // api url

  constructor(private http: HttpClient) { }


  //saves an item on database
  saveItem(item: Item) {
    return this.http.post<Item>('http://localhost:3000/item', item);
  }

  //get all items from database
  getAllItems() {
    return this.http.get<Item[]>('http://localhost:3000/item');
  }

  //get item by id
  getItemById(id: number) {
    return this.http.get<Item>(`http://localhost:3000/item/${id}`);
  }

  //update item by id
  updateItem(item: Item) {
    return this.http.put<Item>(`http://localhost:3000/item/${item.id}`, item);
  }

  //delete item by id
  deleteItem(id: number) {
    return this.http.delete<Item>(`http://localhost:3000/item/${id}`);
  }
}
