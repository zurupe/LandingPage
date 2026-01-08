import { Routes } from '@angular/router';
import { SobreMi } from './sobre-mi/sobre-mi.component';
import { Proyectos } from './proyectos/proyectos.component';
import { Contactos } from './contactos/contactos.component';
import { Home } from './home/home.component';
export const routes: Routes = [
  { path: '', component: Home, data: { animation: 'HomePage' } },
  { path: 'sobre-mi', component: SobreMi, data: { animation: 'AboutPage' } },
  { path: 'proyectos', component: Proyectos, data: { animation: 'ProjectsPage' } },
  { path: 'contactos', component: Contactos, data: { animation: 'ContactPage' } },
  { path: 'contacto', redirectTo: 'contactos', pathMatch: 'full' }

];
