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

  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }

  isContactPage = computed(() => this.currentUrl() === '/contactos');
  contactBtnLabel = computed(() => this.isContactPage() ? 'Volver al Inicio' : 'Contáctame');
  contactBtnLink = computed(() => this.isContactPage() ? '/' : '/contactos');

  sidebarMiniEnabled = computed(() => this.uiService.isSidebarMini() && !this.uiService.isMobile());

  onSidebarClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }

    if (this.sidebarMiniEnabled()) {
      this.uiService.setSidebarMini(false);
    }
  }
}
