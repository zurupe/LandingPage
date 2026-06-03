import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { CommonModule } from '@angular/common';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class Sidebar {
  private readonly router = inject(Router);
  uiService = inject(UiService);

  profileImage = signal('assets/img/PabloZurita_FotoFormal.jpg');

  // Creamos una signal que guarda la URL actual
  currentUrl = signal(this.router.url);
  isMobile = signal(false);

  // Escuchamos cambios de navegación y actualizamos la signal
  constructor() {
    const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 1024px)') : null;
    if (mediaQuery) {
      this.isMobile.set(mediaQuery.matches);
      mediaQuery.addEventListener('change', (event) => {
        this.isMobile.set(event.matches);
      });
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }
  isContactPage = computed(() => this.currentUrl() === '/contactos' || this.currentUrl() === '/contacto');
  contactBtnLabel = computed(() => this.isContactPage() ? 'Volver al Inicio' : 'Contáctame');
  contactBtnLink = computed(() => this.isContactPage() ? '/' : '/contacto');

  sidebarMiniEnabled = computed(() => this.uiService.isSidebarMini() && !this.isMobile());

  onSidebarClick(event: Event): void {
    if (this.sidebarMiniEnabled()) {
      this.uiService.setSidebarMini(false);
    }
  }

  toggleSidebarMini(): void {
    this.uiService.setSidebarMini(!this.uiService.isSidebarMini());
  }
}
