import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbar,
    MatIcon,
    MatNavList,
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [MatSidenav],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  isHandset$: Observable<boolean>;

  constructor(
    drawer: MatSidenav,
    private router: Router,
    private authService: AuthService
  ) {
    this.isHandset$ = of(drawer.mode === 'over');
  }
  
  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
