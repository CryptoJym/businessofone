# CRM Frontend Integration Guide

This guide explains how to integrate the CRM API with frontend forms and components in Business of One.

## Quick Start

### 1. Environment Setup

Add the API URL to your frontend environment:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. Create a CRM Service

```typescript
// services/crm.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class CRMService {
  static async createLead(data: any) {
    const response = await fetch(`${API_URL}/crm/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create lead');
    }
    
    return response.json();
  }
  
  static async trackEvent(eventData: any) {
    const response = await fetch(`${API_URL}/crm/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    return response.json();
  }
}
```

## Form Components

### 1. Strategy Session Form

```tsx
// components/forms/StrategySessionForm.tsx
import { useState } from 'react';
import { CRMService } from '@/services/crm.service';

export function StrategySessionForm() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    businessType: '',
    monthlyRevenue: '',
    urgency: '',
    primaryChallenges: []
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Add UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const leadData = {
        ...formData,
        leadSource: 'strategy_session_form',
        landingPage: window.location.href
      };
      
      // Create lead in CRM
      const result = await CRMService.createLead(leadData);
      
      // Track form submission event
      await CRMService.trackEvent({
        contactId: result.data.crmId,
        eventType: 'form_submission',
        eventName: 'Strategy Session Requested',
        properties: {
          formType: 'strategy_session',
          leadScore: result.data.leadScore
        }
      });
      
      setSuccess(true);
      
      // Redirect to calendar booking or thank you page
      window.location.href = '/thank-you?booking=true';
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
          className="px-4 py-2 border rounded-lg"
        />
        
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      <input
        type="text"
        placeholder="Company (optional)"
        value={formData.company}
        onChange={(e) => setFormData({...formData, company: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      <select
        value={formData.businessType}
        onChange={(e) => setFormData({...formData, businessType: e.target.value})}
        required
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Select Business Type</option>
        <option value="solopreneur">Solopreneur</option>
        <option value="freelancer">Freelancer</option>
        <option value="consultant">Consultant</option>
        <option value="other">Other</option>
      </select>
      
      <select
        value={formData.monthlyRevenue}
        onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
        required
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Select Monthly Revenue</option>
        <option value="<5k">Less than $5k</option>
        <option value="5-10k">$5k - $10k</option>
        <option value="10-25k">$10k - $25k</option>
        <option value="25k+">$25k+</option>
      </select>
      
      <select
        value={formData.urgency}
        onChange={(e) => setFormData({...formData, urgency: e.target.value})}
        required
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">When do you need help?</option>
        <option value="immediate">Immediately</option>
        <option value="1-3months">1-3 months</option>
        <option value="3-6months">3-6 months</option>
        <option value="exploring">Just exploring</option>
      </select>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">What are your primary challenges?</p>
        {['scaling', 'automation', 'time-management', 'marketing', 'sales', 'operations'].map(challenge => (
          <label key={challenge} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={challenge}
              checked={formData.primaryChallenges.includes(challenge)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData({
                    ...formData,
                    primaryChallenges: [...formData.primaryChallenges, challenge]
                  });
                } else {
                  setFormData({
                    ...formData,
                    primaryChallenges: formData.primaryChallenges.filter(c => c !== challenge)
                  });
                }
              }}
            />
            <span className="capitalize">{challenge.replace('-', ' ')}</span>
          </label>
        ))}
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Book Your Free Strategy Session'}
      </button>
    </form>
  );
}
```

### 2. Newsletter Signup Form

```tsx
// components/forms/NewsletterForm.tsx
import { useState } from 'react';
import { CRMService } from '@/services/crm.service';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await CRMService.createLead({
        email,
        leadSource: 'newsletter',
        tags: ['newsletter_subscriber']
      });
      
      await CRMService.trackEvent({
        contactId: result.data.crmId,
        eventType: 'form_submission',
        eventName: 'Newsletter Signup',
        properties: {
          formType: 'newsletter'
        }
      });
      
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup failed:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="p-4 bg-green-100 text-green-700 rounded-lg">
        Thanks for subscribing! Check your email for confirmation.
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? '...' : 'Subscribe'}
      </button>
    </form>
  );
}
```

### 3. Resource Download Form

```tsx
// components/forms/ResourceDownloadForm.tsx
export function ResourceDownloadForm({ resourceId, resourceTitle }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await CRMService.createLead({
        email: formData.email,
        firstName: formData.firstName,
        leadSource: 'resource_download',
        tags: ['resource_download', resourceId]
      });
      
      await CRMService.trackEvent({
        contactId: result.data.crmId,
        eventType: 'resource_download',
        eventName: `Downloaded: ${resourceTitle}`,
        properties: {
          resourceId,
          resourceTitle
        }
      });
      
      // Trigger download
      window.location.href = `/api/download/${resourceId}`;
      
    } catch (err) {
      console.error('Download failed:', err);
    }
  };
  
  // ... form implementation
}
```

## Event Tracking

### Page View Tracking

```tsx
// hooks/usePageTracking.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CRMService } from '@/services/crm.service';

export function usePageTracking() {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Get contact ID from cookie/localStorage if exists
      const contactId = localStorage.getItem('crm_contact_id');
      
      if (contactId) {
        CRMService.trackEvent({
          contactId,
          eventType: 'page_view',
          eventName: `Page View: ${url}`,
          properties: {
            url,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
          }
        });
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
```

## UTM Parameter Handling

```tsx
// utils/utm.ts
export function getUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  
  return utm;
}

// Store UTM params in session storage
export function storeUTMParams() {
  const utm = getUTMParams();
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utm));
  }
}

// Retrieve stored UTM params
export function getStoredUTMParams(): Record<string, string> {
  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : {};
}
```

## Error Handling

```typescript
// utils/crm-error-handler.ts
export class CRMError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'CRMError';
  }
}

export function handleCRMError(error: any): string {
  if (error.statusCode === 429) {
    return 'Too many requests. Please try again later.';
  }
  
  if (error.statusCode === 400) {
    return 'Please check your information and try again.';
  }
  
  if (error.statusCode >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'Something went wrong. Please try again.';
}
```

## Best Practices

1. **Always validate data on frontend** before sending to API
2. **Store contact ID** in localStorage after successful creation
3. **Track meaningful events** that indicate user engagement
4. **Handle errors gracefully** with user-friendly messages
5. **Use loading states** to prevent duplicate submissions
6. **Implement retry logic** for failed requests
7. **Respect user privacy** - get consent before tracking

## Testing

```typescript
// __tests__/crm.test.ts
import { CRMService } from '@/services/crm.service';

describe('CRM Integration', () => {
  it('should create a lead successfully', async () => {
    const leadData = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    };
    
    const result = await CRMService.createLead(leadData);
    
    expect(result.success).toBe(true);
    expect(result.data.email).toBe('test@example.com');
  });
});
```