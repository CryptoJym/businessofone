import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { getCookieConsent, setCookieConsent, acceptAllCookies, rejectAllCookies } from '@/utils/cookies';
import { DEFAULT_COOKIE_CONSENT } from '@/types/cookies';

// Mock js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe('Cookie Consent System', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset localStorage
    localStorage.clear();
  });

  describe('Cookie Utilities', () => {
    test('getCookieConsent returns default consent when no cookie exists', () => {
      const mockCookies = require('js-cookie');
      mockCookies.get.mockReturnValue(undefined);
      
      const consent = getCookieConsent();
      expect(consent).toEqual(DEFAULT_COOKIE_CONSENT);
    });

    test('acceptAllCookies sets all categories to true', () => {
      const mockCookies = require('js-cookie');
      
      acceptAllCookies();
      
      expect(mockCookies.set).toHaveBeenCalledWith(
        'businessofone-cookie-consent',
        expect.stringContaining('"necessary":true'),
        expect.any(Object)
      );
      expect(mockCookies.set).toHaveBeenCalledWith(
        'businessofone-cookie-consent',
        expect.stringContaining('"analytics":true'),
        expect.any(Object)
      );
      expect(mockCookies.set).toHaveBeenCalledWith(
        'businessofone-cookie-consent',
        expect.stringContaining('"marketing":true'),
        expect.any(Object)
      );
      expect(mockCookies.set).toHaveBeenCalledWith(
        'businessofone-cookie-consent',
        expect.stringContaining('"preferences":true'),
        expect.any(Object)
      );
    });

    test('rejectAllCookies keeps necessary cookies enabled', () => {
      const mockCookies = require('js-cookie');
      
      rejectAllCookies();
      
      expect(mockCookies.set).toHaveBeenCalledWith(
        'businessofone-cookie-consent',
        expect.stringContaining('"necessary":true'),
        expect.any(Object)
      );
      expect(mockCookies.set).toHaveBeenCalledWith(
        'businessofone-cookie-consent',
        expect.stringContaining('"analytics":false'),
        expect.any(Object)
      );
    });
  });

  describe('Cookie Consent Banner', () => {
    test('renders cookie banner when no consent is given', () => {
      const mockCookies = require('js-cookie');
      mockCookies.get.mockReturnValue(undefined);
      
      render(<CookieConsentBanner />);
      
      expect(screen.getByText('We value your privacy')).toBeInTheDocument();
      expect(screen.getByText('Accept All')).toBeInTheDocument();
      expect(screen.getByText('Reject All')).toBeInTheDocument();
      expect(screen.getByText('Manage Preferences')).toBeInTheDocument();
    });

    test('does not render banner when consent is already given', () => {
      const mockCookies = require('js-cookie');
      mockCookies.get.mockReturnValue(JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
        preferences: false,
        timestamp: Date.now()
      }));
      
      render(<CookieConsentBanner />);
      
      expect(screen.queryByText('We value your privacy')).not.toBeInTheDocument();
    });

    test('clicking Accept All hides the banner', async () => {
      const mockCookies = require('js-cookie');
      mockCookies.get.mockReturnValue(undefined);
      
      render(<CookieConsentBanner />);
      
      const acceptButton = screen.getByText('Accept All');
      fireEvent.click(acceptButton);
      
      await waitFor(() => {
        expect(screen.queryByText('We value your privacy')).not.toBeInTheDocument();
      });
    });

    test('clicking Manage Preferences opens settings modal', () => {
      const mockCookies = require('js-cookie');
      mockCookies.get.mockReturnValue(undefined);
      
      render(<CookieConsentBanner />);
      
      const manageButton = screen.getByText('Manage Preferences');
      fireEvent.click(manageButton);
      
      expect(screen.getByText('Cookie Preferences')).toBeInTheDocument();
    });
  });
});