# Business of One - Email Integration System

## Overview

The Email Integration System (Stream 7) provides a robust, scalable email service for Business of One. It supports transactional emails, newsletter management, and automated email sequences for nurturing leads and managing customer communications.

## Features

- **Multiple Email Provider Support**: Currently supports SendGrid with easy extensibility for AWS SES, Resend, and SMTP
- **Template Engine**: Handlebars-based email templates with inheritance support
- **Rate Limiting**: Protects against abuse with configurable rate limits
- **Type Safety**: Full TypeScript support with Zod validation
- **Professional Templates**: Pre-built templates for common business scenarios
- **Batch Sending**: Support for sending emails to multiple recipients
- **Email Validation**: Built-in email address validation

## Quick Start

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your email provider credentials
```

3. **Run Development Server**
```bash
npm run dev
```

## API Endpoints

### Send Consultation Confirmation
```http
POST /api/email/consultation-confirmation
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "consultationDate": "2024-01-15",
  "consultationTime": "14:00",
  "timezone": "EST",
  "consultationFormat": "video",
  "meetingLink": "https://zoom.us/j/123456789" // optional
}
```

### Subscribe to Newsletter
```http
POST /api/email/newsletter/subscribe
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "name": "Jane Smith",
  "source": "homepage-footer" // optional
}
```

### Send Resource Download
```http
POST /api/email/resource-download
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name",
  "resourceId": "audit-checklist",
  "resourceName": "Solo Business Audit Checklist",
  "downloadUrl": "https://businessofone.ai/downloads/audit-checklist.pdf"
}
```

### Unsubscribe
```http
POST /api/email/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "token": "unsubscribe-token"
}
```

## Email Templates

### Available Templates

1. **consultation_booking_confirmation** - Sent when a strategy session is booked
2. **newsletter_welcome** - Welcome email for new newsletter subscribers
3. **resource_download** - Delivers downloadable resources with download links
4. **consultation_reminder** - Reminder before scheduled consultations
5. **nurture_sequence_[1-3]** - Automated nurture email sequence

### Creating New Templates

1. Create a new `.hbs` file in `src/templates/`
2. Extend the base template:
```handlebars
{{#extend "base"}}
{{#content "content"}}
    <h1>Your Template Title</h1>
    <p>Your content here...</p>
{{/content}}
{{/extend}}
```

3. Add the template to `EmailTemplate` enum in `src/types/email.types.ts`

## Architecture

```
backend/
├── src/
│   ├── api/
│   │   └── email.routes.ts      # API endpoints
│   ├── config/
│   │   └── email.config.ts      # Email configuration
│   ├── middleware/
│   │   └── rate-limiter.ts      # Rate limiting
│   ├── services/
│   │   └── email/
│   │       ├── base-email.service.ts      # Abstract base class
│   │       ├── sendgrid-email.service.ts  # SendGrid implementation
│   │       └── email-service.factory.ts   # Service factory
│   ├── templates/
│   │   ├── base.hbs                       # Base template
│   │   └── [template-name].hbs            # Email templates
│   ├── types/
│   │   └── email.types.ts                 # TypeScript types
│   └── index.ts                           # Express server
├── .env.example                           # Environment variables example
├── package.json
└── tsconfig.json
```

## Adding New Email Providers

1. Create a new service class extending `BaseEmailService`:
```typescript
export class NewProviderEmailService extends BaseEmailService {
  async send(options: EmailOptions): Promise<EmailResult> {
    // Implementation
  }
  
  async sendBatch(options: EmailOptions[]): Promise<EmailResult[]> {
    // Implementation
  }
}
```

2. Update the factory in `email-service.factory.ts`:
```typescript
case 'newprovider':
  EmailServiceFactory.instance = new NewProviderEmailService();
  break;
```

3. Add provider-specific configuration to `.env`

## Security Considerations

- **API Keys**: Store all API keys in environment variables
- **Rate Limiting**: Configured to prevent abuse
- **Input Validation**: All inputs validated with Zod
- **CORS**: Configured for frontend origin only
- **Helmet**: Security headers enabled
- **Email Validation**: Validates email format before sending

## Testing

```bash
# Run tests
npm test

# Test email sending (development)
curl -X POST http://localhost:3001/api/email/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

## Deployment

1. Set production environment variables
2. Build the TypeScript code:
```bash
npm run build
```
3. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_PROVIDER` | Email service provider (sendgrid, ses, resend, smtp) | Yes |
| `EMAIL_API_KEY` | API key for the email provider | Yes |
| `EMAIL_FROM` | Default from email address | Yes |
| `EMAIL_FROM_NAME` | Default sender name | Yes |
| `EMAIL_REPLY_TO` | Reply-to email address | No |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development, production) | No |

## Monitoring

The system logs all email operations including:
- Successful sends with message IDs
- Failed attempts with error details
- Rate limit violations
- Subscription/unsubscription events

## Future Enhancements

- [ ] Email analytics tracking
- [ ] A/B testing support
- [ ] Email scheduling
- [ ] Webhook handling for email events
- [ ] Database integration for email logs
- [ ] Advanced personalization
- [ ] Multi-language support

## Support

For issues or questions, contact the development team or check the main project documentation.