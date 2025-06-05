# Business of One API

A standard Express.js API with TypeScript, ready for Vercel deployment.

## Features

- ✅ TypeScript support
- ✅ Express.js framework
- ✅ CORS enabled
- ✅ Helmet security
- ✅ Rate limiting
- ✅ Input validation
- ✅ Compression
- ✅ Vercel-ready configuration
- ✅ Environment configuration
- ✅ Health checks

## Setup

1. Install dependencies:
```bash
cd api
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Run development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health information

### API Routes
- `GET /api` - API information
- `POST /api/example` - Example endpoint with validation

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Business
- `GET /api/business/analytics` - Get business analytics
- `POST /api/business/optimize` - Get optimization suggestions
- `GET /api/business/templates` - Get business templates
- `POST /api/business/pricing/calculate` - Calculate project pricing

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Environment Variables

Set these in your Vercel dashboard:
- `NODE_ENV=production`
- `ALLOWED_ORIGINS` (comma-separated list of allowed origins)
- Any other environment variables from `.env.example`

## Development

### Project Structure
```
api/
├── src/
│   ├── index.ts          # Main server file
│   ├── routes/           # Route definitions
│   │   ├── health.ts
│   │   ├── api.ts
│   │   ├── users.ts
│   │   └── business.ts
│   ├── middleware/       # Custom middleware
│   ├── controllers/      # Business logic
│   └── types/           # TypeScript types
├── dist/                # Compiled JavaScript
├── package.json
├── tsconfig.json
├── vercel.json
└── .env.example
```

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting on API routes
- Input validation with express-validator
- Environment variable management

## License

MIT