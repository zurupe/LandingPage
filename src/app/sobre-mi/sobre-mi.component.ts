import { Component, computed, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface Section {
  id: string;
  title: string;
  icon: string;
  content: string;
  isCustom?: boolean; // For sections with complex HTML (links, bold, etc.)
  items?: string[]; // For lists like metas or skills
  quote?: string;
  subsections?: { title: string; items: string[] }[];
}

export interface Interest {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css'
})
export class SobreMi implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Sobre Mí | Pablo Zurita');
    this.metaService.updateTag({ name: 'description', content: 'Conoce más sobre Pablo Zurita, Ingeniero de Software en formación, apasionado por la tecnología, la arquitectura de hardware y el desarrollo de soluciones innovadoras.' });
  }

  birthDate = new Date(2003, 11, 25); // 25 de diciembre de 2003

  age = computed(() => {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();
    const dayDiff = today.getDate() - this.birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  });

  sections = computed<Section[]>(() => [
    {
      id: 'introduccion',
      title: 'Perfil Profesional',
      icon: '👋',
      content: `Soy Pablo Esteban Zurita Rosero, un estudiante de Ingeniería de Software de ${this.age()} años de nacionalidad ecuatoriana. Me caracterizo por mi curiosidad técnica y mi capacidad para adaptarme a nuevas tecnologías.`
    },
    {
      id: 'formacion',
      title: 'Formación Académica',
      icon: '📚',
      content: `Actualmente curso la carrera de <strong>Ingeniería de Software</strong> en la Universidad de las Fuerzas Armadas (ESPE). Durante mi formación, he adquirido competencias sólidas en programación, bases de datos y desarrollo web. Completé mi educación secundaria en la Unidad Educativa Lev Vygotsky, donde senté las bases de mi pensamiento lógico y analítico.`,
      isCustom: true
    },
    {
      id: 'tecnologia',
      title: 'Enfoque Técnico',
      icon: '💻',
      content: 'Mi fascinación por la tecnología comenzó explorando el funcionamiento interno de dispositivos, lo que evolucionó hacia un interés profesional por la arquitectura de computadoras y el desarrollo de software. Mis áreas de interés incluyen:',
      items: [
        'Arquitectura de Hardware y Ensamblaje de Alto Rendimiento',
        'Integración Hardware-Software',
        'Inteligencia Artificial Aplicada',
        'Impacto Social de la Tecnología'
      ]
    },
    {
      id: 'filosofia',
      title: 'Valores Profesionales',
      icon: '🧠',
      content: 'Creo firmemente en el poder de crear valor donde no lo hay. Mi enfoque profesional se basa en la <strong>adaptabilidad</strong> y el <strong>aprendizaje continuo</strong>. Veo cada problema técnico no como un obstáculo, sino como una oportunidad para innovar y diseñar soluciones eficientes. Me impulsa la libertad de construir herramientas que mejoren la vida de las personas.',
      isCustom: true,
      quote: 'Innovación a través de la creatividad y el propósito.'
    },
    {
      id: 'metas',
      title: 'Objetivos Profesionales',
      icon: '🚀',
      content: '',
      subsections: [
        {
          title: 'A corto plazo:',
          items: [
            'Culminar con excelencia mi Ingeniería en Software.',
            'Lanzar un proyecto de software open-source significativo.'
          ]
        },
        {
          title: 'Visión a largo plazo:',
          items: [
            'Alcanzar independencia financiera a través de la innovación tecnológica.',
            'Contribuir activamente a la comunidad global de desarrollo de software libre.'
          ]
        }
      ]
    }
  ]);

  interests: Interest[] = [
    {
      title: 'Disciplina Física',
      icon: '🏋️‍♂️',
      description: 'Mantengo una rutina de entrenamiento físico constante, lo que fortalece mi disciplina y perseverancia, cualidades que aplico diariamente en mi trabajo.'
    },
    {
      title: 'Música',
      icon: '🎵',
      description: 'Aprecio la música como forma de expresión y practico guitarra, desarrollando mi creatividad y atención al detalle.'
    },
    {
      title: 'Aprendizaje Social',
      icon: '📚',
      description: 'Valoro el intercambio de ideas y experiencias. Disfruto de conversaciones enriquecedoras que amplían mi perspectiva del mundo y de la tecnología.'
    }
  ];
}
