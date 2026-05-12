import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EmailService } from './email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class Contactos implements OnInit {
  private emailService = inject(EmailService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  messageSent = false;
  isSending = false;
  errorMessage = '';

  ngOnInit(): void {
    this.titleService.setTitle('Contacto | Pablo Zurita');
    this.metaService.updateTag({ name: 'description', content: '¿Tienes un proyecto en mente? Ponte en contacto con Pablo Zurita para colaborar en soluciones de ingeniería de software y desarrollo personalizado.' });
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    this.isSending = true;
    this.errorMessage = '';

    const form = event.target as HTMLFormElement;

    this.emailService.sendEmail(form)
      .then(() => {
        this.messageSent = true;
        this.isSending = false;
        form.reset();
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
        this.errorMessage = 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.';
        this.isSending = false;
      });
  }
}
