import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { ModifyItemComponent } from './pages/modify-item/modify-item.component';
import { HistoryComponent } from './pages/history/history.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Iniciar Sesion' },
  // include path home to layout component
  { path: 'home', component: MainLayoutComponent, children: [
    { path: 'inventario', component: InventoryComponent, title: 'Inventario' },
    { path: 'inventario/item/:id', component: ItemDetailComponent, title: 'Detalle del Item' },
    { path: 'agregar-item', component: AddItemComponent, title: 'Agregar Item' },
    { path: 'modificar-item', component: ModifyItemComponent, title: 'Modificar Item' },
    { path: 'historial-cambios', component: HistoryComponent, title: 'Historial de Cambios' },
  ] }
];
