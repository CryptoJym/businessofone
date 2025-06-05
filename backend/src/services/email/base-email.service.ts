import { EmailOptions, EmailResult, EmailService, TemplateEmailOptions } from '../../types/email.types';
import * as fs from 'fs/promises';
import * as path from 'path';
import Handlebars from 'handlebars';
import winston from 'winston';

export abstract class BaseEmailService implements EmailService {
  protected logger: winston.Logger;
  protected templates: Map<string, HandlebarsTemplateDelegate> = new Map();

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

    this.registerHandlebarsHelpers();
  }

  abstract send(options: EmailOptions): Promise<EmailResult>;
  abstract sendBatch(options: EmailOptions[]): Promise<EmailResult[]>;

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private registerHandlebarsHelpers(): void {
    const blocks: Record<string, any> = {};

    Handlebars.registerHelper('extend', function(this: any, name: string, options: any) {
      let baseTemplate = blocks[name];
      if (!baseTemplate) {
        baseTemplate = blocks[name] = {};
      }

      const context = Object.create(this);
      const data = Handlebars.createFrame(options.data);
      data.blocks = blocks;
      
      const result = options.fn(context, { data });
      return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('block', function(name: string, options: any) {
      const blocks = options.data.blocks || {};
      const block = blocks[name] || {};
      return block.fn ? block.fn(this) : options.fn(this);
    });

    Handlebars.registerHelper('content', function(this: any, name: string, options: any) {
      const blocks = options.data.blocks || {};
      if (!blocks[name]) {
        blocks[name] = {};
      }
      blocks[name].fn = options.fn;
      blocks[name].context = this;
    });
  }

  protected async loadTemplate(templateName: string): Promise<HandlebarsTemplateDelegate> {
    if (this.templates.has(templateName)) {
      return this.templates.get(templateName)!;
    }

    try {
      const templatePath = path.join(__dirname, '../../templates', `${templateName}.hbs`);
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      
      // Load base template if this template extends it
      if (templateContent.includes('{{#extend')) {
        const baseTemplatePath = path.join(__dirname, '../../templates', 'base.hbs');
        const baseContent = await fs.readFile(baseTemplatePath, 'utf-8');
        Handlebars.registerPartial('base', baseContent);
      }

      const compiledTemplate = Handlebars.compile(templateContent);
      this.templates.set(templateName, compiledTemplate);
      return compiledTemplate;
    } catch (error) {
      this.logger.error(`Failed to load template ${templateName}:`, error);
      throw new Error(`Template ${templateName} not found`);
    }
  }

  protected async renderTemplate(options: TemplateEmailOptions): Promise<{ html: string; subject: string }> {
    const template = await this.loadTemplate(options.template);
    
    // Add common template data
    const templateData = {
      ...options.data,
      year: new Date().getFullYear(),
      companyName: 'Business of One',
      supportEmail: 'support@businessofone.ai',
      websiteUrl: 'https://businessofone.ai',
    };

    const html = template(templateData);
    
    // Subject can also use template variables
    const subjectTemplate = Handlebars.compile(options.subject);
    const subject = subjectTemplate(templateData);

    return { html, subject };
  }

  protected isTemplateEmail(options: EmailOptions): options is TemplateEmailOptions {
    return 'template' in options;
  }

  protected normalizeRecipients(recipients: EmailOptions['to']): Array<{ email: string; name?: string }> {
    if (Array.isArray(recipients)) {
      return recipients.map(r => 
        typeof r === 'string' ? { email: r } : r
      );
    }
    return [typeof recipients === 'string' ? { email: recipients } : recipients];
  }
}