import { EmailService } from '../../types/email.types';
import { emailConfig } from '../../config/email.config';
import { SendGridEmailService } from './sendgrid-email.service';

export class EmailServiceFactory {
  private static instance: EmailService | null = null;

  static getInstance(): EmailService {
    if (!EmailServiceFactory.instance) {
      switch (emailConfig.provider) {
        case 'sendgrid':
          EmailServiceFactory.instance = new SendGridEmailService();
          break;
        case 'ses':
          // TODO: Implement AWS SES service
          throw new Error('AWS SES provider not implemented yet');
        case 'resend':
          // TODO: Implement Resend service
          throw new Error('Resend provider not implemented yet');
        case 'smtp':
          // TODO: Implement generic SMTP service
          throw new Error('SMTP provider not implemented yet');
        default:
          throw new Error(`Unknown email provider: ${emailConfig.provider}`);
      }
    }
    return EmailServiceFactory.instance;
  }

  static resetInstance(): void {
    EmailServiceFactory.instance = null;
  }
}