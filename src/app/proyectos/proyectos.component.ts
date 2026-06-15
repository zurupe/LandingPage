import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ProjectService } from '../project.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class Proyectos implements OnInit {
  private projectService = inject(ProjectService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  projects = this.projectService.projects;

  ngOnInit(): void {
    this.titleService.setTitle('Proyectos Destacados | Pablo Zurita');
    this.metaService.updateTag({ name: 'description', content: 'Explora los proyectos de ingeniería de software desarrollados por Pablo Zurita, incluyendo aplicaciones .NET, C# y web.' });
  }
}
