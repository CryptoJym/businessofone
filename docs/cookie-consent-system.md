# Cookie Consent System Documentation

## Overview

The Cookie Consent System for Business of One provides a GDPR-compliant solution for managing user cookie preferences. It features a clean, professional interface that aligns with the project's design system and offers granular control over different cookie categories.

## Features

- **GDPR Compliant**: Meets European privacy regulations requirements
- **Granular Control**: Users can manage preferences for different cookie categories
- **Persistent Preferences**: Cookie choices are saved for 365 days
- **Non-Intrusive Design**: Clean banner that doesn't disrupt user experience
- **Responsive**: Works seamlessly across all device sizes
- **Accessible**: Follows WCAG guidelines for accessibility

## Architecture

### Components

1. **CookieConsentBanner** (`/app/components/CookieConsentBanner.tsx`)
   - Main component that displays the consent banner
   - Handles Accept All, Reject All, and Manage Preferences actions
   - Automatically hides when consent is given

2. **CookieSettings** (`/app/components/CookieSettings.tsx`)
   - Modal component for detailed cookie preference management
   - Displays all cookie categories with toggle switches
   - Provides descriptions for each category

### Utilities

1. **Cookie Types** (`/app/types/cookies.ts`)
   - TypeScript interfaces and types for type safety
   - Cookie category definitions
   - Default consent configuration

2. **Cookie Utils** (`/app/utils/cookies.ts`)
   - Core functions for cookie management
   - Consent storage and retrieval
   - Category-specific cookie deletion

### Hooks

1. **useCookieConsent** (`/app/hooks/useCookieConsent.ts`)
   - React hook for managing consent state
   - Handles banner and settings modal visibility
   - Provides methods for updating preferences

## Cookie Categories

### 1. Necessary Cookies
- **Always Enabled**: Required for basic website functionality
- **Examples**: Session cookies, security tokens
- **Cannot be disabled**: Essential for the website to work

### 2. Analytics Cookies
- **Purpose**: Help understand how visitors interact with the website
- **Examples**: Google Analytics (_ga, _gid, _gat)
- **Data collected**: Page views, user behavior, traffic sources

### 3. Marketing Cookies
- **Purpose**: Track visitors for advertising purposes
- **Examples**: Facebook Pixel (_fbp), Google Ads
- **Data collected**: Ad performance, conversion tracking

### 4. Preference Cookies
- **Purpose**: Remember user preferences and settings
- **Examples**: Language preferences, theme settings
- **Data collected**: User interface preferences

## Implementation Guide

### 1. Installation

First, install the required dependencies:

```bash
cd frontend
npm install
```

### 2. Integration

The cookie consent system is automatically integrated into the layout:

```typescript
// app/layout.tsx
import CookieConsentBanner from '@/components/CookieConsentBanner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
```

### 3. Checking Consent Status

To check if a specific cookie category is allowed:

```typescript
import { isCategoryAllowed } from '@/utils/cookies';

// In your component or function
if (isCategoryAllowed('analytics')) {
  // Initialize Google Analytics
  initializeAnalytics();
}
```

### 4. Listening to Consent Changes

Components can listen for consent updates:

```typescript
useEffect(() => {
  const handleConsentUpdate = (event: CustomEvent) => {
    // React to consent changes
    console.log('New consent:', event.detail);
  };

  window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
  
  return () => {
    window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  };
}, []);
```

## Customization

### Styling

The system uses Tailwind CSS with custom color variables defined in the project:

- Primary Color: `#4169E1` (Utlyze Blue)
- Accent Color: `#16A085`
- Animations: Slide-up and fade-in effects

### Cookie Expiry

Default expiry is set to 365 days. To change:

```typescript
// In utils/cookies.ts
const CONSENT_COOKIE_EXPIRY = 365; // Change this value
```

### Adding New Cookie Categories

1. Update the type definition in `types/cookies.ts`:
```typescript
export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences' | 'new-category';
```

2. Add to the interface:
```typescript
export interface CookieConsent {
  // ... existing categories
  'new-category': boolean;
}
```

3. Update the categories array:
```typescript
export const COOKIE_CATEGORIES = [
  // ... existing categories
  {
    id: 'new-category',
    name: 'New Category Name',
    description: 'Description of what these cookies do',
    required: false,
  },
];
```

## Testing

The system includes comprehensive tests in `__tests__/cookieConsent.test.tsx`:

```bash
# Run tests
cd frontend
npm test
```

## Privacy Policy Integration

The cookie consent banner links to the privacy policy at `/privacy-policy`. This page includes:

- Detailed explanation of each cookie category
- How users can control cookies
- Contact information for privacy inquiries

## Best Practices

1. **Obtain Consent Before Setting Cookies**: Always check consent before setting non-necessary cookies
2. **Respect User Choices**: Delete cookies when users reject categories
3. **Clear Communication**: Use plain language to explain cookie purposes
4. **Easy Access**: Provide a way for users to change preferences later
5. **Regular Updates**: Keep the privacy policy updated with cookie usage

## Compliance Notes

- **GDPR**: Requires explicit consent for non-essential cookies
- **CCPA**: California residents have the right to opt-out
- **ePrivacy Directive**: Requires consent for all cookies except strictly necessary ones

## Future Enhancements

1. **Cookie Policy API**: Endpoint for programmatic access to policies
2. **Consent Analytics**: Track consent rates and preferences
3. **A/B Testing**: Test different banner designs for better UX
4. **Multi-language Support**: Translations for international users
5. **Cookie Scanner**: Automatically detect and categorize cookies

## Support

For questions or issues with the cookie consent system:
- Email: privacy@businessofone.com
- Documentation: This file
- Tests: See `__tests__/cookieConsent.test.tsx`