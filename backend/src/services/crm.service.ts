import {
  CRMConnector,
  CRMProvider,
  CRMConfig,
  Lead,
  CRMContact,
  CRMEvent,
  LeadScore,
  LeadScoringCriteria
} from '../models/crm.types';
import { HubSpotConnector } from '../connectors/hubspot.connector';
// import { SalesforceConnector } from '../connectors/salesforce.connector';
// import { PipedriveConnector } from '../connectors/pipedrive.connector';
import { logger } from '../utils/logger';

export class CRMService {
  private connector: CRMConnector;
  private provider: CRMProvider;
  
  constructor(config: CRMConfig) {
    this.provider = config.provider;
    this.connector = this.createConnector(config);
  }

  private createConnector(config: CRMConfig): CRMConnector {
    switch (config.provider) {
      case 'hubspot':
        return new HubSpotConnector(config);
      // case 'salesforce':
      //   return new SalesforceConnector(config);
      // case 'pipedrive':
      //   return new PipedriveConnector(config);
      default:
        throw new Error(`Unsupported CRM provider: ${config.provider}`);
    }
  }

  // Lead Management
  async createLead(lead: Lead): Promise<CRMContact> {
    try {
      // Calculate lead score before creating
      const score = this.calculateLeadScore(lead);
      const enrichedLead = { ...lead, leadScore: score.total };
      
      // Create contact in CRM
      const contact = await this.connector.createContact(enrichedLead);
      
      // Track lead creation event
      await this.trackEvent({
        contactId: contact.crmId,
        eventType: 'form_submission',
        eventName: 'Lead Created',
        properties: {
          leadSource: lead.leadSource,
          leadScore: score.total,
          category: score.category
        },
        timestamp: new Date()
      });
      
      logger.info('Lead created successfully', {
        contactId: contact.id,
        email: lead.email,
        score: score.total
      });
      
      return contact;
    } catch (error) {
      logger.error('Failed to create lead', { error, lead });
      throw error;
    }
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<CRMContact> {
    try {
      // Recalculate lead score if relevant fields are updated
      const shouldRecalculateScore = this.shouldRecalculateScore(updates);
      if (shouldRecalculateScore) {
        const existingContact = await this.connector.getContact(id);
        if (existingContact) {
          const mergedLead = { ...existingContact, ...updates };
          const score = this.calculateLeadScore(mergedLead as Lead);
          updates.leadScore = score.total;
        }
      }
      
      const contact = await this.connector.updateContact(id, updates);
      
      logger.info('Lead updated successfully', {
        contactId: contact.id,
        updates: Object.keys(updates)
      });
      
      return contact;
    } catch (error) {
      logger.error('Failed to update lead', { error, id, updates });
      throw error;
    }
  }

  async getLead(id: string): Promise<CRMContact | null> {
    return this.connector.getContact(id);
  }

  async searchLeads(query: string): Promise<CRMContact[]> {
    return this.connector.searchContacts(query);
  }

  // Event Tracking
  async trackEvent(event: CRMEvent): Promise<void> {
    try {
      await this.connector.trackEvent(event);
      logger.info('Event tracked', {
        contactId: event.contactId,
        eventType: event.eventType
      });
    } catch (error) {
      logger.error('Failed to track event', { error, event });
      throw error;
    }
  }

  // Lead Scoring
  calculateLeadScore(lead: Lead): LeadScore {
    const breakdown: { criterion: string; points: number }[] = [];
    let total = 0;

    // Business Type Scoring
    if (lead.businessType) {
      const businessTypeScore = {
        'consultant': 30,
        'freelancer': 25,
        'solopreneur': 20,
        'other': 10
      };
      const points = businessTypeScore[lead.businessType] || 0;
      total += points;
      breakdown.push({ criterion: 'Business Type', points });
    }

    // Monthly Revenue Scoring
    if (lead.monthlyRevenue) {
      const revenueScore = {
        '25k+': 30,
        '10-25k': 25,
        '5-10k': 15,
        '<5k': 5
      };
      const points = revenueScore[lead.monthlyRevenue] || 0;
      total += points;
      breakdown.push({ criterion: 'Monthly Revenue', points });
    }

    // Urgency Scoring
    if (lead.urgency) {
      const urgencyScore = {
        'immediate': 25,
        '1-3months': 20,
        '3-6months': 10,
        'exploring': 5
      };
      const points = urgencyScore[lead.urgency] || 0;
      total += points;
      breakdown.push({ criterion: 'Urgency', points });
    }

    // Primary Challenges Scoring
    if (lead.primaryChallenges && lead.primaryChallenges.length > 0) {
      const points = Math.min(lead.primaryChallenges.length * 5, 15);
      total += points;
      breakdown.push({ criterion: 'Challenges Identified', points });
    }

    // Determine category
    let category: 'hot' | 'warm' | 'cold';
    if (total >= 80) {
      category = 'hot';
    } else if (total >= 50) {
      category = 'warm';
    } else {
      category = 'cold';
    }

    return { total, category, breakdown };
  }

  private shouldRecalculateScore(updates: Partial<Lead>): boolean {
    const scoringFields: (keyof Lead)[] = [
      'businessType',
      'monthlyRevenue',
      'urgency',
      'primaryChallenges'
    ];
    
    return scoringFields.some(field => field in updates);
  }

  // Bulk Operations
  async importLeads(leads: Lead[]): Promise<{
    successful: CRMContact[];
    failed: { lead: Lead; error: string }[];
  }> {
    const successful: CRMContact[] = [];
    const failed: { lead: Lead; error: string }[] = [];

    // Process in batches of 10
    const batchSize = 10;
    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      
      try {
        // Calculate scores for batch
        const enrichedBatch = batch.map(lead => ({
          ...lead,
          leadScore: this.calculateLeadScore(lead).total
        }));
        
        const contacts = await this.connector.batchCreateContacts(enrichedBatch);
        successful.push(...contacts);
      } catch (error: any) {
        // If batch fails, try individual creation
        for (const lead of batch) {
          try {
            const contact = await this.createLead(lead);
            successful.push(contact);
          } catch (individualError: any) {
            failed.push({
              lead,
              error: individualError.message || 'Unknown error'
            });
          }
        }
      }
    }

    logger.info('Lead import completed', {
      total: leads.length,
      successful: successful.length,
      failed: failed.length
    });

    return { successful, failed };
  }

  // Health Check
  async testConnection(): Promise<boolean> {
    return this.connector.testConnection();
  }

  // Analytics
  async getLeadStats(): Promise<{
    total: number;
    byScore: { hot: number; warm: number; cold: number };
    bySource: Record<string, number>;
    byBusinessType: Record<string, number>;
  }> {
    // This would typically query a database or CRM API
    // For now, returning mock data structure
    return {
      total: 0,
      byScore: { hot: 0, warm: 0, cold: 0 },
      bySource: {},
      byBusinessType: {}
    };
  }
}