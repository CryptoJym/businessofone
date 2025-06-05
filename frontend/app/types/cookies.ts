export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
}

export interface CookieConfig {
  name: string;
  category: CookieCategory;
  description: string;
  expiry?: number; // days
}

export interface CookiePreferences {
  consent: CookieConsent;
  showBanner: boolean;
}

export const DEFAULT_COOKIE_CONSENT: CookieConsent = {
  necessary: true, // Always true as these are required
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: Date.now(),
};

export const COOKIE_CATEGORIES = [
  {
    id: 'necessary',
    name: 'Necessary Cookies',
    description: 'These cookies are essential for the website to function properly.',
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website.',
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    description: 'These cookies are used to track visitors across websites for marketing purposes.',
    required: false,
  },
  {
    id: 'preferences',
    name: 'Preference Cookies',
    description: 'These cookies remember your preferences and choices on our website.',
    required: false,
  },
];