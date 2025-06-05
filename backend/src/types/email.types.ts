export interface EmailConfig {
  provider: 'sendgrid' | 'ses' | 'resend' | 'smtp';
  apiKey?: string;
  fromEmail: string;
  fromName: string;
  replyToEmail?: string;
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  content: string; // Base64 encoded content
  filename: string;
  type: string;
  disposition?: 'attachment' | 'inline';
}

export interface BaseEmailOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface TemplateEmailOptions extends BaseEmailOptions {
  template: EmailTemplate;
  data: Record<string, any>;
}

export interface RawEmailOptions extends BaseEmailOptions {
  html: string;
  text?: string;
}

export type EmailOptions = TemplateEmailOptions | RawEmailOptions;

export enum EmailTemplate {
  // Consultation related
  CONSULTATION_BOOKING_CONFIRMATION = 'consultation_booking_confirmation',
  CONSULTATION_REMINDER = 'consultation_reminder',
  CONSULTATION_FOLLOW_UP = 'consultation_follow_up',
  
  // Resource delivery
  RESOURCE_DOWNLOAD = 'resource_download',
  
  // Newsletter
  NEWSLETTER_WELCOME = 'newsletter_welcome',
  NEWSLETTER_WEEKLY = 'newsletter_weekly',
  
  // Nurture sequences
  NURTURE_SEQUENCE_1 = 'nurture_sequence_1',
  NURTURE_SEQUENCE_2 = 'nurture_sequence_2',
  NURTURE_SEQUENCE_3 = 'nurture_sequence_3',
  
  // Transactional
  PASSWORD_RESET = 'password_reset',
  ACCOUNT_VERIFICATION = 'account_verification',
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailService {
  send(options: EmailOptions): Promise<EmailResult>;
  sendBatch(options: EmailOptions[]): Promise<EmailResult[]>;
  validateEmail(email: string): boolean;
}