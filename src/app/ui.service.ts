import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _isSidebarOpen = signal(false);
  
  isSidebarOpen = this._isSidebarOpen.asReadonly();

  toggleSidebar() {
    this._isSidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this._isSidebarOpen.set(false);
  }
}
