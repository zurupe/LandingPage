import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, NavigationEnd, NavigationStart, RouterOutlet } from '@angular/router';
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
  private readonly viewportScroller = inject(ViewportScroller);
  private contexts = inject(ChildrenOutletContexts);
  uiService = inject(UiService);
  private scrollPositions = new Map<string, [number, number]>();

  // Creamos una signal que guarda la URL actual
  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.scrollPositions.set(this.currentUrl(), [window.scrollX, window.scrollY]);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
      const savedPosition = this.scrollPositions.get(event.urlAfterRedirects);
      if (savedPosition) {
        this.viewportScroller.scrollToPosition(savedPosition);
      } else {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  sidebarMiniEnabled = computed(() => this.uiService.isSidebarMini() && !this.uiService.isMobile());
  isProjectDetailPage = computed(() => this.currentUrl().startsWith('/proyectos/'));

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  onLayoutClick(event: MouseEvent): void {
    const path = event.composedPath?.() ?? [];
    const clickedInsideSidebar = (path as EventTarget[]).some(
      item => item instanceof HTMLElement && item.classList.contains('sidebar')
    );

    if (clickedInsideSidebar) {
      return;
    }

    if (this.uiService.isSidebarOpen()) {
      this.uiService.closeSidebar();
      return;
    }

    if (this.isProjectDetailPage() && !this.uiService.isMobile() && !this.uiService.isSidebarMini()) {
      this.uiService.setSidebarMini(true);
      return;
    }

    if (!this.isProjectDetailPage() && this.uiService.isSidebarMini() && !this.uiService.isMobile()) {
      this.uiService.setSidebarMini(false);
    }
  }
}

