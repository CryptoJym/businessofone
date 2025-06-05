// CRM Integration Type Definitions

export interface Lead {
  // Standard Fields
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  
  // Custom Fields for Business of One
  businessType?: 'solopreneur' | 'freelancer' | 'consultant' | 'other';
  monthlyRevenue?: '<5k' | '5-10k' | '10-25k' | '25k+';
  primaryChallenges?: string[];
  urgency?: 'immediate' | '1-3months' | '3-6months' | 'exploring';
  leadSource?: string;
  landingPage?: string;
  utmParameters?: UTMParameters;
  
  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  leadScore?: number;
  tags?: string[];
  customProperties?: Record<string, any>;
}

export interface UTMParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface CRMContact extends Lead {
  id: string;
  crmProvider: CRMProvider;
  crmId: string;
  lastSyncedAt?: Date;
  syncStatus?: 'pending' | 'synced' | 'failed';
  syncError?: string;
}

export interface CRMEvent {
  contactId: string;
  eventType: EventType;
  eventName: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

export type EventType = 
  | 'page_view'
  | 'form_submission'
  | 'resource_download'
  | 'consultation_booked'
  | 'email_opened'
  | 'email_clicked'
  | 'custom';

export type CRMProvider = 'hubspot' | 'salesforce' | 'pipedrive' | 'activecampaign';

export interface CRMConfig {
  provider: CRMProvider;
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  portalId?: string;
  accountId?: string;
  domain?: string;
  sandbox?: boolean;
}

export interface CRMConnector {
  provider: CRMProvider;
  
  // Contact operations
  createContact(lead: Lead): Promise<CRMContact>;
  updateContact(id: string, updates: Partial<Lead>): Promise<CRMContact>;
  getContact(id: string): Promise<CRMContact | null>;
  searchContacts(query: string): Promise<CRMContact[]>;
  
  // Event tracking
  trackEvent(event: CRMEvent): Promise<void>;
  
  // Bulk operations
  batchCreateContacts(leads: Lead[]): Promise<CRMContact[]>;
  
  // Health check
  testConnection(): Promise<boolean>;
}

export interface LeadScoringCriteria {
  field: keyof Lead;
  condition: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
  points: number;
}

export interface LeadScore {
  total: number;
  category: 'hot' | 'warm' | 'cold';
  breakdown: {
    criterion: string;
    points: number;
  }[];
}

export interface CRMWebhook {
  id: string;
  provider: CRMProvider;
  eventType: string;
  url: string;
  secret?: string;
  active: boolean;
  createdAt: Date;
}

export interface CRMSyncResult {
  success: boolean;
  contactId?: string;
  error?: string;
  retryable?: boolean;
  timestamp: Date;
}