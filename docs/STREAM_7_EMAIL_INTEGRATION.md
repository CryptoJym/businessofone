# Stream 7: Email Integration System

## Overview

The Email Integration System for Business of One provides a complete solution for managing email communications, including transactional emails, newsletter subscriptions, and automated nurture sequences. The system is built with scalability, security, and user experience in mind.

## Architecture

### Backend Components

1. **Email Service Layer** (`backend/src/services/email/`)
   - Abstract base service with template rendering
   - SendGrid implementation (easily extensible to other providers)
   - Email service factory for provider selection

2. **API Endpoints** (`backend/src/api/email.routes.ts`)
   - `/api/email/consultation-confirmation` - Send booking confirmations
   - `/api/email/newsletter/subscribe` - Handle newsletter signups
   - `/api/email/resource-download` - Deliver downloadable resources
   - `/api/email/unsubscribe` - Process unsubscribe requests

3. **Email Templates** (`backend/src/templates/`)
   - Base template with Business of One branding
   - Consultation booking confirmation
   - Newsletter welcome
   - Resource download delivery
   - Extensible template system using Handlebars

4. **Security Features**
   - Rate limiting to prevent abuse
   - Input validation with Zod
   - CORS protection
   - Environment-based configuration

### Frontend Components

1. **Email Service** (`frontend/src/services/email.service.ts`)
   - Type-safe API client
   - Error handling and retry logic
   - Email validation

2. **React Hook** (`frontend/src/hooks/useEmail.ts`)
   - Stateful email operations
   - Loading and error states
   - Success handling

3. **UI Components** (`frontend/src/components/email/`)
   - `NewsletterSignup` - Multiple variants for different contexts
   - `LeadCaptureForm` - Resource download with email capture
   - Form validation with react-hook-form and Zod

## Key Features

### 1. Multi-Provider Support
- Currently implements SendGrid
- Architecture supports AWS SES, Resend, and SMTP
- Easy to add new providers

### 2. Template System
- Professional HTML email templates
- Template inheritance for consistency
- Dynamic content with Handlebars
- Mobile-responsive design

### 3. Rate Limiting
- General API rate limiting (100 requests/15 min)
- Email-specific limits (10 emails/hour)
- Subscription limits (3 attempts/day)

### 4. Form Components
- Multiple newsletter signup variants
- Lead capture for resource downloads
- Real-time validation
- Success/error feedback

## Implementation Guide

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Add your SendGrid API key and other settings
```

3. **Start Server**
```bash
npm run dev
```

### Frontend Integration

1. **Newsletter Signup Component**
```tsx
import { NewsletterSignup } from '@/components/email/NewsletterSignup';

// Default variant
<NewsletterSignup source="homepage" />

// Minimal variant for footers
<NewsletterSignup variant="minimal" source="footer" />

// Inline variant for hero sections
<NewsletterSignup variant="inline" source="hero" />
```

2. **Lead Capture Form**
```tsx
import { LeadCaptureForm } from '@/components/email/LeadCaptureForm';

<LeadCaptureForm
  resourceId="audit-checklist"
  resourceName="Solo Business Audit Checklist"
  downloadUrl="https://businessofone.ai/downloads/audit-checklist.pdf"
  title="Get Your Free Audit Checklist"
  description="Discover exactly where your business needs attention."
/>
```

3. **Custom Email Operations**
```tsx
import { useEmail } from '@/hooks/useEmail';

function MyComponent() {
  const { sendConsultationConfirmation, loading, error, success } = useEmail();
  
  const handleBooking = async (bookingData) => {
    await sendConsultationConfirmation({
      name: bookingData.name,
      email: bookingData.email,
      consultationDate: bookingData.date,
      consultationTime: bookingData.time,
      timezone: bookingData.timezone,
      consultationFormat: 'video'
    });
  };
}
```

## Email Templates

### Available Templates

1. **Consultation Booking Confirmation**
   - Session details
   - Pre-call preparation instructions
   - Calendar integration
   - Reschedule options

2. **Newsletter Welcome**
   - Welcome message
   - Value proposition
   - Free resource delivery
   - Call-to-action for consultation

3. **Resource Download**
   - Download link
   - Usage instructions
   - Next steps
   - Consultation upsell

### Creating New Templates

1. Create template file in `backend/src/templates/[template_name].hbs`
2. Extend the base template:
```handlebars
{{#extend "base"}}
{{#content "content"}}
  <!-- Your email content here -->
{{/content}}
{{/extend}}
```
3. Add to `EmailTemplate` enum
4. Use in API endpoints

## API Reference

### Send Consultation Confirmation
```http
POST /api/email/consultation-confirmation
{
  "name": "John Doe",
  "email": "john@example.com",
  "consultationDate": "2024-01-15",
  "consultationTime": "14:00",
  "timezone": "EST",
  "consultationFormat": "video"
}
```

### Subscribe to Newsletter
```http
POST /api/email/newsletter/subscribe
{
  "email": "subscriber@example.com",
  "name": "Jane Smith",
  "source": "homepage"
}
```

### Send Resource Download
```http
POST /api/email/resource-download
{
  "email": "user@example.com",
  "name": "User Name",
  "resourceId": "audit-checklist",
  "resourceName": "Solo Business Audit Checklist",
  "downloadUrl": "https://businessofone.ai/downloads/audit-checklist.pdf"
}
```

## Security Considerations

1. **API Keys**: Store in environment variables
2. **Rate Limiting**: Prevents abuse and spam
3. **Input Validation**: All inputs validated before processing
4. **CORS**: Restricted to frontend origin
5. **Email Validation**: Client and server-side validation

## Testing

### Backend Testing
```bash
# Test newsletter subscription
curl -X POST http://localhost:3001/api/email/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

### Frontend Testing
1. Run the frontend development server
2. Navigate to pages with email components
3. Test form submissions and error states

## Monitoring and Analytics

- All email operations are logged
- Success/failure tracking
- Rate limit violations logged
- Email open/click tracking (if enabled in SendGrid)

## Future Enhancements

1. **Email Analytics Dashboard**
   - Open rates
   - Click-through rates
   - Conversion tracking

2. **Advanced Personalization**
   - Dynamic content based on user behavior
   - A/B testing support

3. **Automation Workflows**
   - Drip campaigns
   - Behavioral triggers
   - Segmentation

4. **Additional Providers**
   - AWS SES implementation
   - Resend integration
   - Generic SMTP support

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check API key configuration
   - Verify rate limits not exceeded
   - Check server logs for errors

2. **Template rendering errors**
   - Ensure all required variables passed
   - Check template syntax
   - Verify base template exists

3. **Frontend connection issues**
   - Verify API URL configuration
   - Check CORS settings
   - Ensure backend is running

## Conclusion

Stream 7 provides a robust, scalable email integration system for Business of One. The modular architecture allows for easy extension and customization while maintaining security and performance standards.