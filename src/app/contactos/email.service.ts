import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    // 🔴 ¡IMPORTANTE! Reemplaza estos valores con los de tu cuenta de EmailJS
    // Crea tu cuenta gratis en https://www.emailjs.com/
    private serviceID = 'service_uzmqja8';
    private templateID = 'template_86jms2p';
    private publicKey = '89hgXfTr-as8j4DIV';

    constructor() { }

    sendEmail(form: HTMLFormElement): Promise<EmailJSResponseStatus> {
        return emailjs.sendForm(
            this.serviceID,
            this.templateID,
            form,
            this.publicKey
        );
    }
}
