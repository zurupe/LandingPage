import { Injectable, signal } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsList = signal<Project[]>([
    {
      title: 'Echospira',
      description: 'Reproductor de audio desarrollado en Windows Forms .NET que incluye una visualización 3D única. El sistema renderiza una esfera compuesta por líneas que reaccionan dinámicamente al audio.',
      image: './assets/img/echospira.jpg',
      technologies: ['C#', '.NET', 'Windows Forms', 'Audio Processing']
    },
    {
      title: 'EcoNoMily',
      description: 'Una aplicación de economía familiar para llevar un control de gastos e ingresos. Permite a los usuarios registrar sus transacciones diarias y generar reportes.',
      image: './assets/img/EcoFamily.jpg',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Próximamente...',
      description: 'Una aplicación móvil y de escritorio con herramientas avanzadas para optimizar la experiencia en Minecraft.',
      image: './assets/img/minecraft.png',
      technologies: ['C++', 'Qt']
    }
  ]);

  get projects() {
    return this.projectsList.asReadonly();
  }

  get projectCount() {
    return this.projectsList().length;
  }
}
