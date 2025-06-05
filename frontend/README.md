# Business of One Frontend - Cookie Consent System

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application with the cookie consent banner.

### 3. Build for Production

```bash
npm run build
npm start
```

## Cookie Consent System Features

### User Experience
- **Non-intrusive banner** at the bottom of the page
- **Three quick options**: Accept All, Reject All, or Manage Preferences
- **Detailed settings modal** for granular control
- **Persistent preferences** saved for 365 days

### Cookie Categories
1. **Necessary** - Always enabled (required for basic functionality)
2. **Analytics** - For understanding user behavior
3. **Marketing** - For advertising and tracking
4. **Preferences** - For remembering user choices

### Implementation

The cookie consent system is automatically loaded on all pages via the root layout:

```typescript
// app/layout.tsx
<CookieConsentBanner />
```

To check consent before setting cookies:

```typescript
import { isCategoryAllowed } from '@/utils/cookies';

if (isCategoryAllowed('analytics')) {
  // Initialize analytics
}
```

### Testing

Run the test suite:

```bash
npm test
```

## Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── CookieConsentBanner.tsx  # Main consent banner
│   │   └── CookieSettings.tsx       # Settings modal
│   ├── hooks/
│   │   └── useCookieConsent.ts      # React hook for consent
│   ├── types/
│   │   └── cookies.ts               # TypeScript types
│   ├── utils/
│   │   └── cookies.ts               # Cookie utilities
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   └── privacy-policy/
│       └── page.tsx                 # Privacy policy page
├── __tests__/
│   └── cookieConsent.test.tsx       # Tests
├── package.json
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── jest.config.js                   # Jest configuration
```

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
- Primary: `#4169E1` (Utlyze Blue)
- Accent: `#16A085`

### Cookie Categories
Add or modify categories in `app/types/cookies.ts`

### Banner Text
Update the banner content in `app/components/CookieConsentBanner.tsx`

## Development Tips

1. The banner won't show if you've already given consent. Clear cookies to test it again.
2. Use browser DevTools to inspect the `businessofone-cookie-consent` cookie
3. Test responsive design - the banner adapts to mobile screens

## Next Steps

1. Integrate analytics services that respect consent
2. Add a cookie policy link in the footer
3. Implement server-side consent checking
4. Add consent analytics to track acceptance rates

For detailed documentation, see `/docs/cookie-consent-system.md`