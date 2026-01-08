import { Component, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {
  private themeService = inject(ThemeService);

  profileImage = computed(() =>
    this.themeService.darkMode()
      ? 'assets/foto-personal-oscuro.jpg'
      : 'assets/foto-personal-claro.jpg'
  );

  constructor() { }
}
