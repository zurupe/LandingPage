import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _isSidebarOpen = signal(false);
  private _isSidebarMini = signal(false);
  
  isSidebarOpen = this._isSidebarOpen.asReadonly();
  isSidebarMini = this._isSidebarMini.asReadonly();

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
