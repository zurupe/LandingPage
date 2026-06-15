import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private readonly mobileBreakpoint = '(max-width: 1024px)';
  private _isSidebarOpen = signal(false);
  private _isSidebarMini = signal(false);
  private _isMobile = signal(false);

  isSidebarOpen = this._isSidebarOpen.asReadonly();
  isSidebarMini = this._isSidebarMini.asReadonly();
  isMobile = this._isMobile.asReadonly();

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(this.mobileBreakpoint);
    this._isMobile.set(mediaQuery.matches);
    mediaQuery.addEventListener('change', (event) => {
      this._isMobile.set(event.matches);
    });
  }

  toggleSidebar() {
    this._isSidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this._isSidebarOpen.set(false);
  }

  setSidebarMini(value: boolean) {
    this._isSidebarMini.set(value);
  }
}
