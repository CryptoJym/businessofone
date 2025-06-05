# Business of One - CRM Integration API

Backend API service for Business of One with comprehensive CRM integration capabilities.

## Features

- 🔌 **Multi-CRM Support**: HubSpot, Salesforce, Pipedrive, ActiveCampaign
- 📊 **Lead Scoring**: Automatic lead qualification based on business metrics
- 🚀 **Event Tracking**: Track user interactions and behaviors
- 🔄 **Webhook Support**: Real-time CRM updates
- 🛡️ **Security**: Rate limiting, input validation, secure headers
- 📈 **Analytics**: Lead statistics and conversion tracking

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Configure your CRM credentials in `.env`

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Contacts

#### Create Contact
```http
POST /api/crm/contacts
Content-Type: application/json

{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Inc",
  "businessType": "consultant",
  "monthlyRevenue": "10-25k",
  "urgency": "immediate",
  "primaryChallenges": ["scaling", "automation"],
  "leadSource": "landing_page"
}
```

#### Update Contact
```http
PUT /api/crm/contacts/:id
Content-Type: application/json

{
  "monthlyRevenue": "25k+",
  "urgency": "immediate"
}
```

#### Get Contact
```http
GET /api/crm/contacts/:id
```

#### Search Contacts
```http
GET /api/crm/contacts/search?q=john@example.com
```

### Event Tracking

#### Track Event
```http
POST /api/crm/events
Content-Type: application/json

{
  "contactId": "hubspot_123456",
  "eventType": "form_submission",
  "eventName": "Downloaded eBook",
  "properties": {
    "ebook_title": "10 Ways to Scale Your Business"
  }
}
```

### Bulk Operations

#### Import Contacts
```http
POST /api/crm/contacts/import
Content-Type: application/json

{
  "leads": [
    {
      "email": "lead1@example.com",
      "firstName": "Lead",
      "lastName": "One"
    },
    {
      "email": "lead2@example.com",
      "firstName": "Lead",
      "lastName": "Two"
    }
  ]
}
```

### Status & Analytics

#### CRM Status
```http
GET /api/crm/status
```

#### Lead Statistics
```http
GET /api/crm/stats
```

### Webhooks

#### Receive CRM Webhooks
```http
POST /api/crm/webhooks/:provider
```

## Lead Scoring

Leads are automatically scored based on:

- **Business Type** (max 30 points)
  - Consultant: 30
  - Freelancer: 25
  - Solopreneur: 20
  - Other: 10

- **Monthly Revenue** (max 30 points)
  - $25k+: 30
  - $10-25k: 25
  - $5-10k: 15
  - <$5k: 5

- **Urgency** (max 25 points)
  - Immediate: 25
  - 1-3 months: 20
  - 3-6 months: 10
  - Exploring: 5

- **Challenges Identified** (max 15 points)
  - 5 points per challenge (capped at 15)

**Categories:**
- Hot Lead: 80-100 points
- Warm Lead: 50-79 points
- Cold Lead: 0-49 points

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applies to all `/api/` endpoints

## Security

- CORS enabled with configurable origins
- Helmet.js for security headers
- Input validation on all endpoints
- Rate limiting to prevent abuse

## Development

### Project Structure
```
backend/
├── src/
│   ├── api/
│   │   └── routes/
│   │       └── crm.routes.ts
│   ├── connectors/
│   │   ├── hubspot.connector.ts
│   │   ├── salesforce.connector.ts
│   │   └── pipedrive.connector.ts
│   ├── models/
│   │   └── crm.types.ts
│   ├── services/
│   │   └── crm.service.ts
│   ├── utils/
│   │   └── logger.ts
│   └── index.ts
├── tests/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

The API is designed to be deployed on:
- Vercel (recommended)
- AWS Lambda
- Heroku
- Any Node.js hosting platform

### Environment Variables

See `.env.example` for all required environment variables.

## Support

For questions or issues, please contact the Business of One development team.