import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, title: string, message: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'oliveshikder2018@gmail.com', 
        subject: title,
        text: message,
        html: `<b>${message}</b>`,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Unable to send email');
    }
  }
}
