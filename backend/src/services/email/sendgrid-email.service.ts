import sgMail from '@sendgrid/mail';
import { BaseEmailService } from './base-email.service';
import { EmailOptions, EmailResult, RawEmailOptions } from '../../types/email.types';
import { emailConfig } from '../../config/email.config';

export class SendGridEmailService extends BaseEmailService {
  constructor() {
    super();
    if (!emailConfig.apiKey) {
      throw new Error('SendGrid API key is required');
    }
    sgMail.setApiKey(emailConfig.apiKey);
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // Render template if needed
      let html: string;
      let subject: string;
      let text: string | undefined;

      if (this.isTemplateEmail(options)) {
        const rendered = await this.renderTemplate(options);
        html = rendered.html;
        subject = rendered.subject;
      } else {
        const rawOptions = options as RawEmailOptions;
        html = rawOptions.html;
        subject = rawOptions.subject;
        text = rawOptions.text;
      }

      const recipients = this.normalizeRecipients(options.to);

      const msg = {
        to: recipients.map(r => ({ email: r.email, name: r.name })),
        from: {
          email: emailConfig.fromEmail,
          name: emailConfig.fromName,
        },
        subject,
        html,
        text: text || this.htmlToText(html),
        replyTo: options.replyTo || emailConfig.replyToEmail,
        attachments: options.attachments?.map(att => ({
          content: att.content,
          filename: att.filename,
          type: att.type,
          disposition: att.disposition || 'attachment',
        })),
        customArgs: options.metadata,
        categories: options.tags,
      };

      const response = await sgMail.send(msg);
      const messageId = response[0].headers['x-message-id'];

      this.logger.info('Email sent successfully', {
        messageId,
        to: recipients.map(r => r.email),
        subject,
      });

      return {
        success: true,
        messageId,
      };
    } catch (error: any) {
      this.logger.error('Failed to send email', {
        error: error.message,
        code: error.code,
        response: error.response?.body,
      });

      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }
  }

  async sendBatch(options: EmailOptions[]): Promise<EmailResult[]> {
    // SendGrid supports batch sending, but for simplicity, we'll send individually
    // This can be optimized later if needed
    const results = await Promise.all(
      options.map(opt => this.send(opt))
    );
    return results;
  }

  private htmlToText(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p\s*\/?>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
}