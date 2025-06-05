import Cookies from 'js-cookie';
import { CookieConsent, CookieCategory, DEFAULT_COOKIE_CONSENT } from '@/types/cookies';

const CONSENT_COOKIE_NAME = 'businessofone-cookie-consent';
const CONSENT_COOKIE_EXPIRY = 365; // days

export const getCookieConsent = (): CookieConsent => {
  const consent = Cookies.get(CONSENT_COOKIE_NAME);
  if (consent) {
    try {
      return JSON.parse(consent);
    } catch (error) {
      console.error('Error parsing cookie consent:', error);
    }
  }
  return DEFAULT_COOKIE_CONSENT;
};

export const setCookieConsent = (consent: CookieConsent): void => {
  const consentWithTimestamp = {
    ...consent,
    timestamp: Date.now(),
  };
  
  Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(consentWithTimestamp), {
    expires: CONSENT_COOKIE_EXPIRY,
    sameSite: 'strict',
    secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
  });

  // Trigger custom event for other components to react to consent changes
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consentWithTimestamp }));
  }
};

export const hasUserConsented = (): boolean => {
  const consent = Cookies.get(CONSENT_COOKIE_NAME);
  return consent !== undefined;
};

export const isCategoryAllowed = (category: CookieCategory): boolean => {
  const consent = getCookieConsent();
  return consent[category] === true;
};

export const acceptAllCookies = (): void => {
  const consent: CookieConsent = {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
    timestamp: Date.now(),
  };
  setCookieConsent(consent);
};

export const rejectAllCookies = (): void => {
  const consent: CookieConsent = {
    necessary: true, // Necessary cookies are always enabled
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: Date.now(),
  };
  setCookieConsent(consent);
};

export const updateCookieCategory = (category: CookieCategory, value: boolean): void => {
  const currentConsent = getCookieConsent();
  const updatedConsent = {
    ...currentConsent,
    [category]: category === 'necessary' ? true : value, // Necessary cookies can't be disabled
  };
  setCookieConsent(updatedConsent);
};

// Helper function to delete cookies by category
export const deleteCookiesByCategory = (category: CookieCategory): void => {
  // This is where you would implement logic to delete specific cookies
  // based on their category. For now, we'll log the action.
  console.log(`Deleting cookies for category: ${category}`);
  
  // Example implementation for common analytics/marketing cookies
  if (category === 'analytics') {
    // Delete Google Analytics cookies
    Cookies.remove('_ga');
    Cookies.remove('_gid');
    Cookies.remove('_gat');
  } else if (category === 'marketing') {
    // Delete Facebook Pixel cookies
    Cookies.remove('_fbp');
    // Delete other marketing cookies
  }
};

// Initialize cookie consent on page load
export const initializeCookieConsent = (): void => {
  const consent = getCookieConsent();
  
  // Apply consent preferences
  Object.entries(consent).forEach(([category, allowed]) => {
    if (category !== 'timestamp' && !allowed && category !== 'necessary') {
      deleteCookiesByCategory(category as CookieCategory);
    }
  });
};