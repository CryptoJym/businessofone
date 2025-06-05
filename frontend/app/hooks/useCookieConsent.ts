import { useState, useEffect, useCallback } from 'react';
import { CookieConsent, CookieCategory } from '@/types/cookies';
import {
  getCookieConsent,
  setCookieConsent,
  hasUserConsented,
  acceptAllCookies,
  rejectAllCookies,
  updateCookieCategory,
  initializeCookieConsent,
} from '@/utils/cookies';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(getCookieConsent());
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initialize consent on mount
    initializeCookieConsent();
    
    // Check if user has already consented
    const hasConsented = hasUserConsented();
    setShowBanner(!hasConsented);

    // Listen for consent updates from other components
    const handleConsentUpdate = (event: CustomEvent<CookieConsent>) => {
      setConsent(event.detail);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, []);

  const acceptAll = useCallback(() => {
    acceptAllCookies();
    setShowBanner(false);
    setShowSettings(false);
    setConsent(getCookieConsent());
  }, []);

  const rejectAll = useCallback(() => {
    rejectAllCookies();
    setShowBanner(false);
    setShowSettings(false);
    setConsent(getCookieConsent());
  }, []);

  const updateCategory = useCallback((category: CookieCategory, value: boolean) => {
    updateCookieCategory(category, value);
    setConsent(getCookieConsent());
  }, []);

  const savePreferences = useCallback(() => {
    setCookieConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  }, [consent]);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  return {
    consent,
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    updateCategory,
    savePreferences,
    openSettings,
    closeSettings,
  };
};