import { Injectable, signal } from '@angular/core';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  bannerImage: string;
  technologies: string[];
  repoUrl: string;
  galleryImages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsList = signal<Project[]>([
    {
      id: '1',
      slug: 'echospira',
      title: 'Echospira',
      description: 'Reproductor de audio desarrollado en Windows Forms .NET que incluye una visualización 3D única. El sistema renderiza una esfera compuesta por líneas que reaccionan dinámicamente al audio.',
      fullDescription: 'Echospira es un reproductor de audio avanzado desarrollado en C# con Windows Forms y .NET. La característica distintiva es su visualización 3D única que renderiza una esfera compuesta por líneas dinámicas que reaccionan en tiempo real al audio que se está reproduciendo.',
      image: './assets/img/echospira.jpg',
      bannerImage: './assets/img/projects/echospira/banner.png',
      technologies: ['C#', '.NET', 'Windows Forms', 'Audio Processing'],
      repoUrl: 'https://github.com/zurupe/Echospira',
      galleryImages: [
        './assets/img/projects/echospira/gallery_1.png',
        './assets/img/projects/echospira/gallery_2.png',
        './assets/img/projects/echospira/gallery_3.png',
        './assets/img/projects/echospira/gallery_4.png'
      ]
    },
    {
      id: '2',
      slug: 'economily',
      title: 'EcoNoMily',
      description: 'Una aplicación de economía familiar para llevar un control de gastos e ingresos. Permite a los usuarios registrar sus transacciones diarias y generar reportes.',
      fullDescription: 'EcoNoMily es una aplicación web completa para la gestión de finanzas familiares. Te permite registrar ingresos y gastos, categorizarlos, y generar reportes visuales para entender mejor tus patrones de gasto.',
      image: './assets/img/EcoFamily.jpg',
      bannerImage: './assets/img/projects/economily/banner.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      repoUrl: '',
      galleryImages: [
        './assets/img/projects/economily/gallery_1.png',
        './assets/img/projects/economily/gallery_2.png',
        './assets/img/projects/economily/gallery_3.png',
        './assets/img/projects/economily/gallery_4.png'
      ]
    },
    {
      id: '3',
      slug: 'mc-servers',
      title: 'MC Servers',
      description: 'Pagina para mostrar tus servidores de minecraft de forma publica o privada, su uso personal es gratuito',
      fullDescription: 'MC Servers es una plataforma web que permite a los administradores de servidores Minecraft mostrar sus servidores de forma pública o privada. Con características avanzadas de gestión y un interfaz intuitivo.',
      image: './assets/img/mcservers.png',
      bannerImage: './assets/img/projects/mc-servers/banner.png',
      technologies: ['Vite', 'javascript', 'html', 'css', 'tailwindcss', 'sqlite', 'docker'],
      repoUrl: 'https://github.com/zurupe/mcservers',
      galleryImages: [
        './assets/img/projects/mc-servers/gallery_1.png',
        './assets/img/projects/mc-servers/gallery_2.png',
        './assets/img/projects/mc-servers/gallery_3.png',
        './assets/img/projects/mc-servers/gallery_4.png'
      ]
    },
    {
      id: '4',
      slug: 'minecraft-herramientas',
      title: 'Próximamente...',
      description: 'Una aplicación móvil y de escritorio con herramientas avanzadas para optimizar la experiencia en Minecraft.',
      fullDescription: 'Una suite completa de herramientas para Minecraft disponible tanto en dispositivos móviles como en escritorio. Con características avanzadas de optimización y gestión de servidor.',
      image: './assets/img/minecraft.png',
      bannerImage: './assets/img/projects/minecraft-herramientas/banner.png',
      technologies: ['C++', 'Qt'],
      repoUrl: '',
      galleryImages: [
        './assets/img/projects/minecraft-herramientas/gallery_1.png',
        './assets/img/projects/minecraft-herramientas/gallery_2.png',
        './assets/img/projects/minecraft-herramientas/gallery_3.png',
        './assets/img/projects/minecraft-herramientas/gallery_4.png'
      ]
    }
  ]);

  get projects() {
    return this.projectsList.asReadonly();
  }

  get projectCount() {
    return this.projectsList().length;
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.projectsList().find(project => project.slug === slug);
  }
}
