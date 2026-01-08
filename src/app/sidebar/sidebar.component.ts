import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ThemeService } from '../theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class Sidebar {
  private readonly router = inject(Router);
  private themeService = inject(ThemeService);

  profileImage = computed(() =>
    this.themeService.darkMode()
      ? 'assets/foto-personal-oscuro.jpg'
      : 'assets/foto-personal-claro.jpg'
  );

  // Creamos una signal que guarda la URL actual
  currentUrl = signal(this.router.url);

  // Escuchamos cambios de navegación y actualizamos la signal
  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }
  showContactBtn = computed(() => this.currentUrl() !== '/contacto');
}
