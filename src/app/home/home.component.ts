import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ProjectService } from '../project.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home implements OnInit {
  private projectService = inject(ProjectService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  profileImage = signal('assets/img/PabloZurita_FotoFormal.jpg');
  
  startDate = signal(new Date('2022-06-01'));

  ngOnInit(): void {
    this.titleService.setTitle('Pablo Zurita | Software Engineer');
    this.metaService.updateTag({ name: 'description', content: 'Portafolio profesional de Pablo Zurita, Ingeniero de Software especializado en arquitectura escalable y .NET.' });
  }

  projectCount = computed(() => this.projectService.projectCount);
  
  yearsOfExperience = computed(() => {
    const today = new Date();
    const diff = today.getTime() - this.startDate().getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  });
}
