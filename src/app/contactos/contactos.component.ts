import { Component, inject } from '@angular/core';
import { EmailService } from './email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class Contactos {
  private emailService = inject(EmailService);

  messageSent = false;
  isSending = false;
  errorMessage = '';

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
