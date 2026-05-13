import { Component, computed, inject, signal, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class Sidebar {
  private readonly router = inject(Router);
  uiService = inject(UiService);

  profileImage = signal('assets/img/PabloZurita_FotoFormal.jpg');

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
  isContactPage = computed(() => this.currentUrl() === '/contactos' || this.currentUrl() === '/contacto');
  contactBtnLabel = computed(() => this.isContactPage() ? 'Volver al Inicio' : 'Contáctame');
  contactBtnLink = computed(() => this.isContactPage() ? '/' : '/contacto');
}
