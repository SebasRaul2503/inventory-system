import { Component, ViewChild } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  constructor(drawer: MatSidenav) {
    this.isHandset$ = of(drawer.mode === 'over');
  }
  
}
