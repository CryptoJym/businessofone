/**
 * Cookie Consent Component
 * GDPR-compliant cookie consent banner with granular control
 */

class CookieConsent {
  constructor(options = {}) {
    this.options = {
      position: 'bottom',
      theme: 'light',
      primaryColor: '#4169E1',
      ...options
    };
    
    this.consentState = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      functional: false
    };
    
    this.init();
  }

  init() {
    // Check if consent has been given before
    const savedConsent = this.loadConsent();
    
    if (savedConsent) {
      this.consentState = savedConsent;
      this.applyConsent();
    } else {
      // Show banner if no consent saved
      this.render();
    }
  }

  render() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = `cookie-consent-banner cookie-consent-${this.options.position} cookie-consent-${this.options.theme}`;
    
    banner.innerHTML = `
      <div class="cookie-consent-container">
        <div class="cookie-consent-content">
          <div class="cookie-consent-header">
            <h3>🍪 Cookie Preferences</h3>
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
          </div>
          
          <div class="cookie-consent-options">
            <div class="cookie-category">
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-necessary" checked disabled>
                <span class="toggle-slider"></span>
                <div class="category-info">
                  <strong>Necessary</strong>
                  <small>Essential for the website to function properly</small>
                </div>
              </label>
            </div>
            
            <div class="cookie-category">
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-analytics">
                <span class="toggle-slider"></span>
                <div class="category-info">
                  <strong>Analytics</strong>
                  <small>Help us understand how visitors interact with our website</small>
                </div>
              </label>
            </div>
            
            <div class="cookie-category">
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-marketing">
                <span class="toggle-slider"></span>
                <div class="category-info">
                  <strong>Marketing</strong>
                  <small>Used to deliver personalized advertisements</small>
                </div>
              </label>
            </div>
            
            <div class="cookie-category">
              <label class="cookie-toggle">
                <input type="checkbox" id="consent-functional">
                <span class="toggle-slider"></span>
                <div class="category-info">
                  <strong>Functional</strong>
                  <small>Enable enhanced functionality and personalization</small>
                </div>
              </label>
            </div>
          </div>
          
          <div class="cookie-consent-actions">
            <button class="cookie-btn cookie-btn-secondary" id="cookie-settings">Manage Preferences</button>
            <button class="cookie-btn cookie-btn-primary" id="cookie-accept-selected">Accept Selected</button>
            <button class="cookie-btn cookie-btn-primary" id="cookie-accept-all">Accept All</button>
          </div>
        </div>
        
        <button class="cookie-consent-close" id="cookie-close">&times;</button>
      </div>
    `;
    
    // Add styles
    this.addStyles();
    
    // Append to body
    document.body.appendChild(banner);
    
    // Add event listeners
    this.attachEventListeners();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cookie-consent-banner {
        position: fixed;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideUp 0.3s ease-out;
      }
      
      .cookie-consent-bottom {
        bottom: 0;
      }
      
      .cookie-consent-top {
        top: 0;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
      
      .cookie-consent-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 24px;
        position: relative;
      }
      
      .cookie-consent-header h3 {
        margin: 0 0 8px 0;
        font-size: 20px;
        color: #333;
      }
      
      .cookie-consent-header p {
        margin: 0 0 20px 0;
        color: #666;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .cookie-consent-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      
      .cookie-category {
        background: #f8f9fa;
        padding: 16px;
        border-radius: 8px;
        transition: background 0.2s;
      }
      
      .cookie-category:hover {
        background: #e9ecef;
      }
      
      .cookie-toggle {
        display: flex;
        align-items: flex-start;
        cursor: pointer;
        position: relative;
      }
      
      .cookie-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .toggle-slider {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
        background-color: #ccc;
        border-radius: 24px;
        margin-right: 12px;
        transition: background-color 0.2s;
        flex-shrink: 0;
      }
      
      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.2s;
      }
      
      .cookie-toggle input:checked + .toggle-slider {
        background-color: ${this.options.primaryColor};
      }
      
      .cookie-toggle input:checked + .toggle-slider:before {
        transform: translateX(20px);
      }
      
      .cookie-toggle input:disabled + .toggle-slider {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .category-info {
        flex: 1;
      }
      
      .category-info strong {
        display: block;
        margin-bottom: 4px;
        color: #333;
        font-size: 14px;
      }
      
      .category-info small {
        color: #666;
        font-size: 12px;
        line-height: 1.4;
      }
      
      .cookie-consent-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      
      .cookie-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .cookie-btn-primary {
        background: ${this.options.primaryColor};
        color: white;
      }
      
      .cookie-btn-primary:hover {
        background: ${this.adjustColor(this.options.primaryColor, -20)};
        transform: translateY(-1px);
      }
      
      .cookie-btn-secondary {
        background: transparent;
        color: ${this.options.primaryColor};
        border: 1px solid ${this.options.primaryColor};
      }
      
      .cookie-btn-secondary:hover {
        background: ${this.options.primaryColor}10;
      }
      
      .cookie-consent-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s;
      }
      
      .cookie-consent-close:hover {
        background: #f8f9fa;
        color: #333;
      }
      
      /* Dark theme */
      .cookie-consent-dark {
        background: #1a1a1a;
        color: white;
      }
      
      .cookie-consent-dark .cookie-consent-header h3 {
        color: white;
      }
      
      .cookie-consent-dark .cookie-consent-header p {
        color: #ccc;
      }
      
      .cookie-consent-dark .cookie-category {
        background: #2a2a2a;
      }
      
      .cookie-consent-dark .cookie-category:hover {
        background: #333;
      }
      
      .cookie-consent-dark .category-info strong {
        color: white;
      }
      
      .cookie-consent-dark .category-info small {
        color: #ccc;
      }
      
      .cookie-consent-dark .cookie-consent-close {
        color: #666;
      }
      
      .cookie-consent-dark .cookie-consent-close:hover {
        background: #2a2a2a;
        color: white;
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .cookie-consent-container {
          padding: 16px;
        }
        
        .cookie-consent-options {
          grid-template-columns: 1fr;
          gap: 12px;
        }
        
        .cookie-consent-actions {
          flex-direction: column;
        }
        
        .cookie-btn {
          width: 100%;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  attachEventListeners() {
    // Accept all
    document.getElementById('cookie-accept-all').addEventListener('click', () => {
      this.consentState = {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true
      };
      this.saveAndApply();
    });
    
    // Accept selected
    document.getElementById('cookie-accept-selected').addEventListener('click', () => {
      this.consentState = {
        necessary: true,
        analytics: document.getElementById('consent-analytics').checked,
        marketing: document.getElementById('consent-marketing').checked,
        functional: document.getElementById('consent-functional').checked
      };
      this.saveAndApply();
    });
    
    // Close button
    document.getElementById('cookie-close').addEventListener('click', () => {
      this.hideBanner();
    });
    
    // Settings button (for future modal)
    document.getElementById('cookie-settings').addEventListener('click', () => {
      // Toggle expanded view or open modal
      console.log('Cookie settings clicked');
    });
  }

  saveAndApply() {
    this.saveConsent();
    this.applyConsent();
    this.hideBanner();
  }

  saveConsent() {
    const consentData = {
      ...this.consentState,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    } catch (e) {
      console.error('Failed to save cookie consent:', e);
    }
  }

  loadConsent() {
    try {
      const saved = localStorage.getItem('cookie_consent');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if consent is older than 365 days
        const consentDate = new Date(parsed.timestamp);
        const daysSinceConsent = (new Date() - consentDate) / (1000 * 60 * 60 * 24);
        
        if (daysSinceConsent > 365) {
          // Consent expired, need to ask again
          return null;
        }
        
        return {
          necessary: parsed.necessary,
          analytics: parsed.analytics,
          marketing: parsed.marketing,
          functional: parsed.functional
        };
      }
    } catch (e) {
      console.error('Failed to load cookie consent:', e);
    }
    
    return null;
  }

  applyConsent() {
    // Update GTM consent state
    if (window.gtag) {
      gtag('consent', 'update', {
        'analytics_storage': this.consentState.analytics ? 'granted' : 'denied',
        'ad_storage': this.consentState.marketing ? 'granted' : 'denied',
        'functionality_storage': this.consentState.functional ? 'granted' : 'denied',
        'personalization_storage': this.consentState.marketing ? 'granted' : 'denied',
        'security_storage': 'granted'
      });
    }
    
    // Update analytics library consent
    if (window.analytics && window.analytics.updateConsent) {
      window.analytics.updateConsent({
        analytics_storage: this.consentState.analytics ? 'granted' : 'denied',
        ad_storage: this.consentState.marketing ? 'granted' : 'denied',
        functionality_storage: this.consentState.functional ? 'granted' : 'denied',
        personalization_storage: this.consentState.marketing ? 'granted' : 'denied',
        security_storage: 'granted'
      });
    }
    
    // Fire consent event
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
      detail: this.consentState
    }));
  }

  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease-out';
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  // Helper function to adjust color brightness
  adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }

  // Public method to show preferences
  showPreferences() {
    this.render();
  }

  // Public method to get current consent state
  getConsentState() {
    return { ...this.consentState };
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
  });
} else {
  window.cookieConsent = new CookieConsent();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CookieConsent;
}