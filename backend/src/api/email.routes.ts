import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { EmailServiceFactory } from '../services/email/email-service.factory';
import { EmailTemplate } from '../types/email.types';
import { rateLimiter } from '../middleware/rate-limiter';
import winston from 'winston';

const router = Router();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Validation schemas
const emailSchema = z.string().email();

const consultationBookingSchema = z.object({
  name: z.string().min(2),
  email: emailSchema,
  consultationDate: z.string(),
  consultationTime: z.string(),
  timezone: z.string(),
  consultationFormat: z.enum(['video', 'phone']),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
});

const newsletterSubscribeSchema = z.object({
  email: emailSchema,
  name: z.string().min(2),
  source: z.string().optional(),
});

const resourceDownloadSchema = z.object({
  email: emailSchema,
  name: z.string().min(2),
  resourceId: z.string(),
  resourceName: z.string(),
  downloadUrl: z.string().url(),
});

// Send consultation booking confirmation
router.post('/consultation-confirmation', rateLimiter, async (req: Request, res: Response) => {
  try {
    const data = consultationBookingSchema.parse(req.body);
    const emailService = EmailServiceFactory.getInstance();

    const result = await emailService.send({
      to: { email: data.email, name: data.name },
      subject: 'Your Business Strategy Session is Confirmed! 🎯',
      template: EmailTemplate.CONSULTATION_BOOKING_CONFIRMATION,
      data: {
        ...data,
        consultantName: 'Sarah Chen',
        preCallFormUrl: 'https://businessofone.ai/pre-call-form',
        calendarLink: `https://businessofone.ai/calendar/add?date=${data.consultationDate}&time=${data.consultationTime}`,
        rescheduleLink: 'https://businessofone.ai/reschedule',
        resourceUrl: 'https://businessofone.ai/resources/growth-toolkit',
      },
    });

    if (result.success) {
      logger.info('Consultation confirmation email sent', { 
        email: data.email, 
        messageId: result.messageId 
      });
      res.json({ success: true, messageId: result.messageId });
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error: any) {
    logger.error('Failed to send consultation confirmation', { error: error.message });
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: 'Invalid request data', details: error.errors });
    } else {
      res.status(500).json({ success: false, error: 'Failed to send confirmation email' });
    }
  }
});

// Subscribe to newsletter
router.post('/newsletter/subscribe', rateLimiter, async (req: Request, res: Response) => {
  try {
    const data = newsletterSubscribeSchema.parse(req.body);
    const emailService = EmailServiceFactory.getInstance();

    // Send welcome email
    const result = await emailService.send({
      to: { email: data.email, name: data.name },
      subject: 'Welcome to Business of One! 🚀',
      template: EmailTemplate.NEWSLETTER_WELCOME,
      data: {
        name: data.name,
        senderName: 'Alex Thompson',
        auditChecklistUrl: 'https://businessofone.ai/download/audit-checklist',
        consultationUrl: 'https://businessofone.ai/book-consultation',
      },
    });

    if (result.success) {
      // TODO: Also add to email list (SendGrid contacts, etc.)
      logger.info('Newsletter subscription successful', { 
        email: data.email, 
        source: data.source 
      });
      res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } else {
      throw new Error(result.error || 'Failed to subscribe');
    }
  } catch (error: any) {
    logger.error('Failed to subscribe to newsletter', { error: error.message });
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: 'Invalid request data', details: error.errors });
    } else {
      res.status(500).json({ success: false, error: 'Failed to subscribe to newsletter' });
    }
  }
});

// Send resource download email
router.post('/resource-download', rateLimiter, async (req: Request, res: Response) => {
  try {
    const data = resourceDownloadSchema.parse(req.body);
    const emailService = EmailServiceFactory.getInstance();

    const result = await emailService.send({
      to: { email: data.email, name: data.name },
      subject: `Your download is ready: ${data.resourceName}`,
      template: EmailTemplate.RESOURCE_DOWNLOAD,
      data: {
        name: data.name,
        resourceName: data.resourceName,
        downloadUrl: data.downloadUrl,
        consultationUrl: 'https://businessofone.ai/book-consultation',
      },
    });

    if (result.success) {
      logger.info('Resource download email sent', { 
        email: data.email, 
        resourceId: data.resourceId 
      });
      res.json({ success: true, message: 'Download link sent to your email' });
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error: any) {
    logger.error('Failed to send resource download email', { error: error.message });
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: 'Invalid request data', details: error.errors });
    } else {
      res.status(500).json({ success: false, error: 'Failed to send download email' });
    }
  }
});

// Unsubscribe from emails
router.post('/unsubscribe', async (req: Request, res: Response) => {
  try {
    const { email, token } = req.body;
    
    // TODO: Verify unsubscribe token and update subscription status
    // For now, just validate the email
    emailSchema.parse(email);

    logger.info('User unsubscribed', { email });
    res.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (error: any) {
    logger.error('Failed to unsubscribe', { error: error.message });
    res.status(400).json({ success: false, error: 'Invalid unsubscribe request' });
  }
});

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'email' });
});

export default router;