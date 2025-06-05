import { Router, Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { CRMService } from '../../services/crm.service';
import { Lead, CRMEvent, CRMConfig } from '../../models/crm.types';
import { logger } from '../../utils/logger';

const router = Router();

// Initialize CRM service with config from environment
const crmConfig: CRMConfig = {
  provider: (process.env.CRM_PROVIDER as any) || 'hubspot',
  apiKey: process.env.HUBSPOT_API_KEY,
  portalId: process.env.HUBSPOT_PORTAL_ID,
};

const crmService = new CRMService(crmConfig);

// Validation middleware
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// POST /api/crm/contacts - Create a new contact
router.post('/contacts', [
  body('email').isEmail().normalizeEmail(),
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('company').optional().trim().notEmpty(),
  body('phone').optional().isMobilePhone('any'),
  body('businessType').optional().isIn(['solopreneur', 'freelancer', 'consultant', 'other']),
  body('monthlyRevenue').optional().isIn(['<5k', '5-10k', '10-25k', '25k+']),
  body('urgency').optional().isIn(['immediate', '1-3months', '3-6months', 'exploring']),
  body('primaryChallenges').optional().isArray(),
  body('leadSource').optional().trim().notEmpty(),
  body('landingPage').optional().isURL(),
  handleValidationErrors
], async (req: Request, res: Response) => {
  try {
    const lead: Lead = req.body;
    
    // Add UTM parameters if present in query
    if (req.query.utm_source || req.query.utm_medium || req.query.utm_campaign) {
      lead.utmParameters = {
        source: req.query.utm_source as string,
        medium: req.query.utm_medium as string,
        campaign: req.query.utm_campaign as string,
        term: req.query.utm_term as string,
        content: req.query.utm_content as string,
      };
    }
    
    const contact = await crmService.createLead(lead);
    
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact created successfully'
    });
  } catch (error: any) {
    logger.error('Error creating contact', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to create contact',
      message: error.message
    });
  }
});

// PUT /api/crm/contacts/:id - Update a contact
router.put('/contacts/:id', [
  param('id').notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('company').optional().trim().notEmpty(),
  body('phone').optional().isMobilePhone('any'),
  body('businessType').optional().isIn(['solopreneur', 'freelancer', 'consultant', 'other']),
  body('monthlyRevenue').optional().isIn(['<5k', '5-10k', '10-25k', '25k+']),
  body('urgency').optional().isIn(['immediate', '1-3months', '3-6months', 'exploring']),
  handleValidationErrors
], async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: Partial<Lead> = req.body;
    
    const contact = await crmService.updateLead(id, updates);
    
    res.json({
      success: true,
      data: contact,
      message: 'Contact updated successfully'
    });
  } catch (error: any) {
    logger.error('Error updating contact', { error: error.message, id: req.params.id });
    res.status(500).json({
      success: false,
      error: 'Failed to update contact',
      message: error.message
    });
  }
});

// GET /api/crm/contacts/:id - Get a contact
router.get('/contacts/:id', [
  param('id').notEmpty(),
  handleValidationErrors
], async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await crmService.getLead(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error: any) {
    logger.error('Error getting contact', { error: error.message, id: req.params.id });
    res.status(500).json({
      success: false,
      error: 'Failed to get contact',
      message: error.message
    });
  }
});

// GET /api/crm/contacts/search - Search contacts
router.get('/contacts/search', [
  query('q').notEmpty().trim(),
  handleValidationErrors
], async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const contacts = await crmService.searchLeads(q as string);
    
    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error: any) {
    logger.error('Error searching contacts', { error: error.message, query: req.query.q });
    res.status(500).json({
      success: false,
      error: 'Failed to search contacts',
      message: error.message
    });
  }
});

// POST /api/crm/events - Track an event
router.post('/events', [
  body('contactId').notEmpty(),
  body('eventType').notEmpty().isIn([
    'page_view', 'form_submission', 'resource_download', 
    'consultation_booked', 'email_opened', 'email_clicked', 'custom'
  ]),
  body('eventName').notEmpty().trim(),
  body('properties').optional().isObject(),
  handleValidationErrors
], async (req: Request, res: Response) => {
  try {
    const event: CRMEvent = {
      ...req.body,
      timestamp: new Date()
    };
    
    await crmService.trackEvent(event);
    
    res.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error: any) {
    logger.error('Error tracking event', { error: error.message, event: req.body });
    res.status(500).json({
      success: false,
      error: 'Failed to track event',
      message: error.message
    });
  }
});

// POST /api/crm/contacts/import - Bulk import contacts
router.post('/contacts/import', [
  body('leads').isArray().notEmpty(),
  body('leads.*.email').isEmail().normalizeEmail(),
  handleValidationErrors
], async (req: Request, res: Response) => {
  try {
    const { leads } = req.body;
    const result = await crmService.importLeads(leads);
    
    res.json({
      success: true,
      data: result,
      message: `Imported ${result.successful.length} contacts successfully`
    });
  } catch (error: any) {
    logger.error('Error importing contacts', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to import contacts',
      message: error.message
    });
  }
});

// GET /api/crm/status - Check CRM connection status
router.get('/status', async (req: Request, res: Response) => {
  try {
    const isConnected = await crmService.testConnection();
    
    res.json({
      success: true,
      data: {
        provider: crmConfig.provider,
        connected: isConnected,
        timestamp: new Date()
      }
    });
  } catch (error: any) {
    logger.error('Error checking CRM status', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to check CRM status',
      message: error.message
    });
  }
});

// POST /api/crm/webhooks/:provider - Handle CRM webhooks
router.post('/webhooks/:provider', async (req: Request, res: Response) => {
  try {
    const { provider } = req.params;
    const payload = req.body;
    
    // Log webhook for debugging
    logger.info('Webhook received', { 
      provider, 
      eventType: payload.eventType || payload.event_type,
      objectId: payload.objectId || payload.object_id
    });
    
    // Handle different webhook events based on provider
    switch (provider) {
      case 'hubspot':
        // Handle HubSpot webhook
        // Verify webhook signature if configured
        // Process the event
        break;
      case 'salesforce':
        // Handle Salesforce webhook
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Unknown webhook provider'
        });
    }
    
    res.json({ success: true });
  } catch (error: any) {
    logger.error('Error processing webhook', { 
      error: error.message, 
      provider: req.params.provider 
    });
    res.status(500).json({
      success: false,
      error: 'Failed to process webhook'
    });
  }
});

// GET /api/crm/stats - Get lead statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await crmService.getLeadStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    logger.error('Error getting lead stats', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to get lead statistics',
      message: error.message
    });
  }
});

export default router;