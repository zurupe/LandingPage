import { Component } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

@Component({
  selector: 'app-proyectos',
  imports: [],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class Proyectos {
  projects: Project[] = [
    {
      title: 'Echospira',
      description: 'Reproductor de audio desarrollado en Windows Forms .NET que incluye una visualización 3D única. El sistema renderiza una esfera compuesta por líneas que reaccionan dinámicamente al audio, creando la ilusión de una estructura tridimensional viva que baila al ritmo de la música.',
      image: 'assets/echospira.jpg',
      technologies: ['C#', '.NET', 'Windows Forms', 'Audio Processing']
    },
    {
      title: 'EcoNoMily',
      description: 'Una aplicación de economía familiar para llevar un control de gastos e ingresos. Permite a los usuarios registrar sus transacciones diarias, categorizar gastos e ingresos, y generar reportes mensuales para una mejor planificación financiera.',
      image: 'assets/EcoFamily.jpg',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Próximamente...',
      description: 'Una aplicación móvil y de escritorio con herramientas avanzadas para optimizar la experiencia en Minecraft.',
      image: 'assets/minecraft.png',
      technologies: ['C++', 'Qt']
    }
  ];
}
