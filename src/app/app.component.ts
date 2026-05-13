import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav.component';
import { Footer } from './footer/footer.component';
import { Home } from './home/home.component';
import { Sidebar } from './sidebar/sidebar.component';
import { filter } from 'rxjs/operators';

import { fadeAnimation } from './route-animations';
import { ChildrenOutletContexts } from '@angular/router';

import { UiService } from './ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nav, Footer, Sidebar, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeAnimation]
})
export class App {
  private readonly router = inject(Router);
  private contexts = inject(ChildrenOutletContexts);
  uiService = inject(UiService);

  // Creamos una signal que guarda la URL actual
  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }

  // Computed para decidir cuándo mostrar el sidebar
  showSidebar = computed(() => this.currentUrl() !== '/');

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

