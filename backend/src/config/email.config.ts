import { EmailConfig } from '../types/email.types';
import dotenv from 'dotenv';

dotenv.config();

export const emailConfig: EmailConfig = {
  provider: (process.env.EMAIL_PROVIDER as EmailConfig['provider']) || 'sendgrid',
  apiKey: process.env.EMAIL_API_KEY,
  fromEmail: process.env.EMAIL_FROM || 'hello@businessofone.ai',
  fromName: process.env.EMAIL_FROM_NAME || 'Business of One',
  replyToEmail: process.env.EMAIL_REPLY_TO || 'support@businessofone.ai',
};

// Validate required configuration
export function validateEmailConfig(): void {
  if (!emailConfig.apiKey) {
    throw new Error('EMAIL_API_KEY environment variable is required');
  }
  
  if (!emailConfig.fromEmail) {
    throw new Error('EMAIL_FROM environment variable is required');
  }
}