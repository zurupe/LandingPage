import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProjectService, Project } from '../../project.service';
import { Title, Meta } from '@angular/platform-browser';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private uiService = inject(UiService);

  project = signal<Project | undefined>(undefined);
  selectedImageIndex = signal(0);
  lightboxOpen = signal(false);

  ngOnInit(): void {
    // Collapse sidebar on detail page
    this.uiService.setSidebarMini(true);
    this.uiService.closeSidebar();

    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const foundProject = this.projectService.getProjectBySlug(slug);
      
      if (foundProject) {
        this.project.set(foundProject);
        this.titleService.setTitle(`${foundProject.title} | Pablo Zurita`);
        this.metaService.updateTag({ 
          name: 'description', 
          content: foundProject.fullDescription 
        });
      } else {
        this.router.navigate(['/proyectos']);
      }
    });
  }

  ngOnDestroy(): void {
    // Restore sidebar to normal on leaving
    this.uiService.setSidebarMini(false);
  }

  openLightbox(index: number): void {
    this.selectedImageIndex.set(index);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      img.src = './assets/img/placeholder-gallery.png';
    }
  }

  nextImage(): void {
    if (this.project()) {
      const images = this.project()!.galleryImages;
      const nextIndex = (this.selectedImageIndex() + 1) % images.length;
      this.selectedImageIndex.set(nextIndex);
    }
  }

  prevImage(): void {
    if (this.project()) {
      const images = this.project()!.galleryImages;
      const prevIndex = (this.selectedImageIndex() - 1 + images.length) % images.length;
      this.selectedImageIndex.set(prevIndex);
    }
  }

  getImageUrl(path: string): string {
    return path;
  }
}
