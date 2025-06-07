/**
 * Analytics Library
 * Provides a unified interface for all analytics tracking
 */

class Analytics {
  constructor(config) {
    this.config = config || window.analyticsConfig;
    this.initialized = false;
    this.dataLayer = window.dataLayer || [];
    this.consentGranted = this.loadConsentState();
    
    // Initialize if consent is granted
    if (this.consentGranted.analytics_storage === 'granted') {
      this.initialize();
    }
  }

  /**
   * Initialize all analytics services
   */
  initialize() {
    if (this.initialized) return;
    
    this.initializeGTM();
    this.initializeGA4();
    this.initializeFacebookPixel();
    this.initializeClarity();
    this.setupEventListeners();
    
    this.initialized = true;
    this.log('Analytics initialized');
  }

  /**
   * Initialize Google Tag Manager
   */
  initializeGTM() {
    if (!this.config.gtm.enabled || !this.config.gtm.containerId) return;
    
    const gtmId = this.config.gtm.containerId;
    const env = this.config.gtm.environments[process.env.NODE_ENV] || '';
    
    // GTM script injection
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      const f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+(env?'&gtm_auth='+env:'');
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);
  }

  /**
   * Initialize Google Analytics 4
   */
  initializeGA4() {
    if (!this.config.ga4.enabled || !this.config.ga4.measurementId) return;
    
    // GA4 Global Site Tag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4.measurementId}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){dataLayer.push(arguments);};
    gtag('js', new Date());
    
    // Configure GA4
    gtag('config', this.config.ga4.measurementId, {
      'debug_mode': this.config.ga4.debugMode,
      'anonymize_ip': this.config.privacy.anonymizeIp
    });
  }

  /**
   * Initialize Facebook Pixel
   */
  initializeFacebookPixel() {
    if (!this.config.facebook.enabled || !this.config.facebook.pixelId) return;
    
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', this.config.facebook.pixelId);
    fbq('track', 'PageView');
  }

  /**
   * Initialize Microsoft Clarity
   */
  initializeClarity() {
    if (!this.config.clarity.enabled || !this.config.clarity.projectId) return;
    
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",this.config.clarity.projectId);
  }

  /**
   * Track a custom event
   */
  trackEvent(eventName, parameters = {}) {
    if (!this.initialized) return;
    
    // Add timestamp and session data
    const enrichedParams = {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_location: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent
    };
    
    // Send to GTM dataLayer
    this.dataLayer.push({
      event: eventName,
      ...enrichedParams
    });
    
    // Send to GA4 if direct integration
    if (window.gtag) {
      gtag('event', eventName, enrichedParams);
    }
    
    // Log in debug mode
    this.log(`Event tracked: ${eventName}`, enrichedParams);
  }

  /**
   * Track page view
   */
  trackPageView(pagePath, pageTitle) {
    this.trackEvent('page_view', {
      page_path: pagePath || window.location.pathname,
      page_title: pageTitle || document.title
    });
  }

  /**
   * Track conversion
   */
  trackConversion(conversionType, value, additionalParams = {}) {
    const conversionConfig = this.config.conversionValues[conversionType] || {};
    
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value: value || conversionConfig.value,
      currency: conversionConfig.currency || 'USD',
      ...additionalParams
    });
    
    // Facebook Pixel conversion
    if (window.fbq && conversionType === 'strategySessionBooking') {
      fbq('track', 'Lead', {
        value: value || conversionConfig.value,
        currency: conversionConfig.currency || 'USD'
      });
    }
  }

  /**
   * Track form interaction
   */
  trackFormInteraction(formName, action, fieldName = null) {
    const eventName = this.config.customEvents.forms[formName]?.[action] || `${formName}_${action}`;
    
    this.trackEvent(eventName, {
      form_name: formName,
      action: action,
      field_name: fieldName
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage) {
    const eventName = this.config.customEvents.scroll[`depth${percentage}`] || `scroll_depth_${percentage}`;
    
    this.trackEvent(eventName, {
      scroll_percentage: percentage,
      vertical_scroll_percentage: percentage
    });
  }

  /**
   * Track engagement time
   */
  trackEngagementTime(seconds) {
    const eventName = this.config.customEvents.engagement[`time${seconds}s`] || `engaged_${seconds}_seconds`;
    
    this.trackEvent(eventName, {
      engagement_time_seconds: seconds
    });
  }

  /**
   * Set user properties
   */
  setUserProperty(propertyName, value) {
    const propertyKey = this.config.userProperties[propertyName] || propertyName;
    
    // GTM dataLayer
    this.dataLayer.push({
      event: 'user_property_set',
      user_properties: {
        [propertyKey]: value
      }
    });
    
    // GA4 user properties
    if (window.gtag) {
      gtag('set', 'user_properties', {
        [propertyKey]: value
      });
    }
  }

  /**
   * Track A/B test exposure
   */
  trackExperiment(experimentName, variant) {
    this.trackEvent('experiment_exposure', {
      experiment_name: experimentName,
      variant_name: variant
    });
  }

  /**
   * Setup automatic event listeners
   */
  setupEventListeners() {
    // Scroll tracking
    this.setupScrollTracking();
    
    // Engagement time tracking
    this.setupEngagementTracking();
    
    // Outbound link tracking
    this.setupOutboundLinkTracking();
    
    // Form abandonment tracking
    this.setupFormAbandonmentTracking();
    
    // Error tracking
    this.setupErrorTracking();
  }

  /**
   * Setup scroll depth tracking
   */
  setupScrollTracking() {
    let scrollPercentages = [25, 50, 75, 90, 100];
    let percentagesReached = new Set();
    
    const checkScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
      
      scrollPercentages.forEach(percentage => {
        if (scrollPercentage >= percentage && !percentagesReached.has(percentage)) {
          percentagesReached.add(percentage);
          this.trackScrollDepth(percentage);
        }
      });
    };
    
    // Throttle scroll events
    let scrollTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(checkScrollDepth, 100);
    });
  }

  /**
   * Setup engagement time tracking
   */
  setupEngagementTracking() {
    let engagementTime = 0;
    let lastActiveTime = Date.now();
    let isActive = true;
    const milestones = [15, 30, 60, 180];
    const reachedMilestones = new Set();
    
    // Track active/idle state
    const resetActiveTimer = () => {
      lastActiveTime = Date.now();
      isActive = true;
    };
    
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetActiveTimer, true);
    });
    
    // Check for idle
    setInterval(() => {
      if (Date.now() - lastActiveTime > 30000) {
        isActive = false;
      }
      
      if (isActive) {
        engagementTime++;
        
        milestones.forEach(milestone => {
          if (engagementTime >= milestone && !reachedMilestones.has(milestone)) {
            reachedMilestones.add(milestone);
            this.trackEngagementTime(milestone);
          }
        });
      }
    }, 1000);
  }

  /**
   * Setup outbound link tracking
   */
  setupOutboundLinkTracking() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Check if external link
      try {
        const url = new URL(href, window.location.href);
        if (url.hostname !== window.location.hostname) {
          this.trackEvent('outbound_link_click', {
            link_url: href,
            link_text: link.textContent,
            link_domain: url.hostname
          });
        }
      } catch (e) {
        // Invalid URL, ignore
      }
    });
  }

  /**
   * Setup form abandonment tracking
   */
  setupFormAbandonmentTracking() {
    const forms = {};
    
    // Track form interactions
    document.addEventListener('focusin', (e) => {
      const form = e.target.closest('form');
      if (!form || !form.id) return;
      
      if (!forms[form.id]) {
        forms[form.id] = {
          started: true,
          startTime: Date.now(),
          submitted: false,
          fields: new Set()
        };
        
        const formName = form.getAttribute('data-form-name') || form.id;
        this.trackFormInteraction(formName, 'start');
      }
      
      if (e.target.name) {
        forms[form.id].fields.add(e.target.name);
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!form.id || !forms[form.id]) return;
      
      forms[form.id].submitted = true;
      const formName = form.getAttribute('data-form-name') || form.id;
      this.trackFormInteraction(formName, 'submit');
    });
    
    // Check for abandonment on page unload
    window.addEventListener('beforeunload', () => {
      Object.keys(forms).forEach(formId => {
        const formData = forms[formId];
        if (formData.started && !formData.submitted && formData.fields.size > 0) {
          const formName = document.getElementById(formId)?.getAttribute('data-form-name') || formId;
          this.trackFormInteraction(formName, 'abandon', Array.from(formData.fields).join(','));
        }
      });
    });
  }

  /**
   * Setup error tracking
   */
  setupErrorTracking() {
    window.addEventListener('error', (e) => {
      this.trackEvent('javascript_error', {
        error_message: e.message,
        error_source: e.filename,
        error_line: e.lineno,
        error_column: e.colno,
        error_stack: e.error?.stack
      });
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      this.trackEvent('unhandled_promise_rejection', {
        error_reason: e.reason?.toString(),
        error_promise: e.promise?.toString()
      });
    });
  }

  /**
   * Load consent state from localStorage
   */
  loadConsentState() {
    try {
      const saved = localStorage.getItem('analytics_consent');
      return saved ? JSON.parse(saved) : this.config.privacy.defaultConsent;
    } catch (e) {
      return this.config.privacy.defaultConsent;
    }
  }

  /**
   * Update consent state
   */
  updateConsent(consentState) {
    this.consentGranted = { ...this.consentGranted, ...consentState };
    
    // Save to localStorage
    try {
      localStorage.setItem('analytics_consent', JSON.stringify(this.consentGranted));
    } catch (e) {
      // localStorage not available
    }
    
    // Update GTM consent
    if (window.gtag) {
      gtag('consent', 'update', consentState);
    }
    
    // Initialize if newly granted
    if (consentState.analytics_storage === 'granted' && !this.initialized) {
      this.initialize();
    }
  }

  /**
   * Debug logging
   */
  log(...args) {
    if (this.config.debug.logEvents) {
      console.log('[Analytics]', ...args);
    }
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = analytics;
} else {
  window.analytics = analytics;
}