'use client';

import React from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import CookieSettings from './CookieSettings';
import clsx from 'clsx';

const CookieConsentBanner: React.FC = () => {
  const {
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    openSettings,
    consent,
    updateCategory,
    savePreferences,
    closeSettings,
  } = useCookieConsent();

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {/* Main Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-white border-t border-border shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-gray-600">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={rejectAll}
                    className={clsx(
                      "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    Reject All
                  </button>
                  <button
                    onClick={openSettings}
                    className={clsx(
                      "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      "bg-white text-primary border border-primary hover:bg-primary/5"
                    )}
                  >
                    Manage Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className={clsx(
                      "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    Accept All
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href="/privacy-policy"
                  className="text-sm text-primary hover:underline"
                >
                  Read our Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <CookieSettings
          consent={consent}
          onUpdateCategory={updateCategory}
          onSave={savePreferences}
          onClose={closeSettings}
        />
      )}
    </>
  );
};

export default CookieConsentBanner;