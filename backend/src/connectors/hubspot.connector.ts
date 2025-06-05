import { Client } from '@hubspot/api-client';
import { 
  CRMConnector, 
  CRMContact, 
  Lead, 
  CRMEvent, 
  CRMConfig,
  CRMProvider 
} from '@models/crm.types';
import { logger } from '@utils/logger';

export class HubSpotConnector implements CRMConnector {
  public readonly provider: CRMProvider = 'hubspot';
  private client: Client;
  private config: CRMConfig;

  constructor(config: CRMConfig) {
    this.config = config;
    this.client = new Client({ 
      accessToken: config.apiKey || config.accessToken 
    });
  }

  async createContact(lead: Lead): Promise<CRMContact> {
    try {
      const properties = this.mapLeadToHubSpotProperties(lead);
      
      const response = await this.client.crm.contacts.basicApi.create({
        properties,
        associations: []
      });

      logger.info('HubSpot contact created', { 
        contactId: response.id, 
        email: lead.email 
      });

      return this.mapHubSpotContactToCRMContact(response, lead);
    } catch (error: any) {
      // Handle duplicate contact
      if (error.code === 'CONTACT_EXISTS') {
        logger.info('Contact already exists, updating instead', { 
          email: lead.email 
        });
        
        const existingContact = await this.searchContacts(lead.email);
        if (existingContact.length > 0) {
          return this.updateContact(existingContact[0].crmId, lead);
        }
      }
      
      logger.error('Failed to create HubSpot contact', error);
      throw new Error(`HubSpot contact creation failed: ${error.message}`);
    }
  }

  async updateContact(id: string, updates: Partial<Lead>): Promise<CRMContact> {
    try {
      const properties = this.mapLeadToHubSpotProperties(updates);
      
      const response = await this.client.crm.contacts.basicApi.update(id, {
        properties
      });

      logger.info('HubSpot contact updated', { contactId: id });

      return this.mapHubSpotContactToCRMContact(response, updates as Lead);
    } catch (error: any) {
      logger.error('Failed to update HubSpot contact', error);
      throw new Error(`HubSpot contact update failed: ${error.message}`);
    }
  }

  async getContact(id: string): Promise<CRMContact | null> {
    try {
      const response = await this.client.crm.contacts.basicApi.getById(
        id,
        undefined,
        undefined,
        ['firstname', 'lastname', 'email', 'phone', 'company']
      );

      return this.mapHubSpotContactToCRMContact(response);
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return null;
      }
      
      logger.error('Failed to get HubSpot contact', error);
      throw new Error(`HubSpot contact retrieval failed: ${error.message}`);
    }
  }

  async searchContacts(query: string): Promise<CRMContact[]> {
    try {
      const response = await this.client.crm.contacts.searchApi.doSearch({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: query
          }]
        }],
        properties: ['firstname', 'lastname', 'email', 'phone', 'company'],
        limit: 100
      });

      return response.results.map(contact => 
        this.mapHubSpotContactToCRMContact(contact)
      );
    } catch (error: any) {
      logger.error('Failed to search HubSpot contacts', error);
      throw new Error(`HubSpot contact search failed: ${error.message}`);
    }
  }

  async trackEvent(event: CRMEvent): Promise<void> {
    try {
      // HubSpot uses Timeline Events API for custom events
      const eventData = {
        eventTemplateId: this.getEventTemplateId(event.eventType),
        objectId: event.contactId,
        tokens: {
          ...event.properties,
          eventName: event.eventName,
          timestamp: event.timestamp.toISOString()
        }
      };

      // Note: Timeline Events API requires additional setup in HubSpot
      // For now, we'll log the event and can implement full tracking later
      logger.info('HubSpot event tracked', { 
        contactId: event.contactId, 
        eventType: event.eventType 
      });

      // Alternative: Update contact with last activity
      await this.updateContact(event.contactId, {
        customProperties: {
          lastEventType: event.eventType,
          lastEventDate: event.timestamp
        }
      });
    } catch (error: any) {
      logger.error('Failed to track HubSpot event', error);
      throw new Error(`HubSpot event tracking failed: ${error.message}`);
    }
  }

  async batchCreateContacts(leads: Lead[]): Promise<CRMContact[]> {
    try {
      const inputs = leads.map(lead => ({
        properties: this.mapLeadToHubSpotProperties(lead)
      }));

      const response = await this.client.crm.contacts.batchApi.create({
        inputs
      });

      logger.info('HubSpot batch contacts created', { 
        count: response.results.length 
      });

      return response.results.map((contact, index) => 
        this.mapHubSpotContactToCRMContact(contact, leads[index])
      );
    } catch (error: any) {
      logger.error('Failed to batch create HubSpot contacts', error);
      throw new Error(`HubSpot batch creation failed: ${error.message}`);
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      // Try to get account info to verify connection
      await this.client.crm.contacts.basicApi.getPage(1);
      logger.info('HubSpot connection test successful');
      return true;
    } catch (error: any) {
      logger.error('HubSpot connection test failed', error);
      return false;
    }
  }

  private mapLeadToHubSpotProperties(lead: Partial<Lead>): Record<string, string> {
    const properties: Record<string, string> = {};

    // Map standard fields
    if (lead.email) properties.email = lead.email;
    if (lead.firstName) properties.firstname = lead.firstName;
    if (lead.lastName) properties.lastname = lead.lastName;
    if (lead.company) properties.company = lead.company;
    if (lead.phone) properties.phone = lead.phone;

    // Map custom fields for Business of One
    if (lead.businessType) properties.business_type = lead.businessType;
    if (lead.monthlyRevenue) properties.monthly_revenue = lead.monthlyRevenue;
    if (lead.primaryChallenges) {
      properties.primary_challenges = lead.primaryChallenges.join(';');
    }
    if (lead.urgency) properties.urgency = lead.urgency;
    if (lead.leadSource) properties.hs_lead_status = lead.leadSource;
    if (lead.landingPage) properties.landing_page = lead.landingPage;

    // Map UTM parameters
    if (lead.utmParameters) {
      if (lead.utmParameters.source) {
        properties.utm_source = lead.utmParameters.source;
      }
      if (lead.utmParameters.medium) {
        properties.utm_medium = lead.utmParameters.medium;
      }
      if (lead.utmParameters.campaign) {
        properties.utm_campaign = lead.utmParameters.campaign;
      }
    }

    // Map lead score if available
    if (lead.leadScore !== undefined) {
      properties.hubspotscore = lead.leadScore.toString();
    }

    return properties;
  }

  private mapHubSpotContactToCRMContact(
    hubspotContact: any, 
    originalLead?: Lead
  ): CRMContact {
    const properties = hubspotContact.properties || {};
    
    const contact: CRMContact = {
      id: `hubspot_${hubspotContact.id}`,
      crmProvider: 'hubspot',
      crmId: hubspotContact.id,
      email: properties.email || originalLead?.email || '',
      firstName: properties.firstname,
      lastName: properties.lastname,
      company: properties.company,
      phone: properties.phone,
      lastSyncedAt: new Date(),
      syncStatus: 'synced'
    };

    // Map custom properties back
    if (properties.business_type) {
      contact.businessType = properties.business_type as any;
    }
    if (properties.monthly_revenue) {
      contact.monthlyRevenue = properties.monthly_revenue as any;
    }
    if (properties.primary_challenges) {
      contact.primaryChallenges = properties.primary_challenges.split(';');
    }
    if (properties.urgency) {
      contact.urgency = properties.urgency as any;
    }
    if (properties.hubspotscore) {
      contact.leadScore = parseInt(properties.hubspotscore);
    }

    return contact;
  }

  private getEventTemplateId(eventType: string): string {
    // Map event types to HubSpot event template IDs
    // These would need to be configured in HubSpot
    const eventMap: Record<string, string> = {
      'page_view': 'page_view_template',
      'form_submission': 'form_submission_template',
      'resource_download': 'resource_download_template',
      'consultation_booked': 'consultation_booked_template',
      'email_opened': 'email_opened_template',
      'email_clicked': 'email_clicked_template',
      'custom': 'custom_event_template'
    };

    return eventMap[eventType] || 'custom_event_template';
  }
}