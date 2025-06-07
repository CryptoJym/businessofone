/**
 * Analytics Configuration
 * Centralized configuration for all analytics and tracking services
 */

const analyticsConfig = {
  // Google Tag Manager
  gtm: {
    containerId: 'GTM-XXXXXXX', // Replace with your GTM container ID
    enabled: true,
    environments: {
      development: 'env-X', // GTM environment for dev
      staging: 'env-Y',    // GTM environment for staging
      production: ''       // Leave empty for production
    }
  },

  // Google Analytics 4
  ga4: {
    measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 measurement ID
    enabled: true,
    debugMode: process.env.NODE_ENV === 'development',
    // Enhanced measurement settings
    enhancedMeasurement: {
      scrollTracking: true,
      outboundClicks: true,
      siteSearch: true,
      videoEngagement: true,
      fileDownloads: true
    }
  },

  // Facebook Pixel
  facebook: {
    pixelId: 'XXXXXXXXXXXXXXX', // Replace with your Facebook Pixel ID
    enabled: true,
    autoConfig: true,
    // Standard events to track automatically
    standardEvents: {
      PageView: true,
      ViewContent: true,
      Search: true,
      Lead: true,
      CompleteRegistration: true
    }
  },

  // Microsoft Clarity
  clarity: {
    projectId: 'XXXXXXXXXX', // Replace with your Clarity project ID
    enabled: true,
    // Clarity specific settings
    settings: {
      cookies: true,
      sessionRecording: true,
      heatmaps: true
    }
  },

  // Custom Events Configuration
  customEvents: {
    // Primary CTA Events
    primaryCTA: {
      click: 'primary_cta_click',
      hover: 'primary_cta_hover',
      view: 'primary_cta_view'
    },
    
    // Form Events
    forms: {
      strategySession: {
        start: 'strategy_session_form_start',
        fieldInteraction: 'strategy_session_field_interaction',
        abandon: 'strategy_session_form_abandon',
        submit: 'strategy_session_form_submit',
        success: 'strategy_session_booking_success',
        error: 'strategy_session_booking_error'
      },
      newsletter: {
        start: 'newsletter_form_start',
        submit: 'newsletter_form_submit',
        success: 'newsletter_signup_success'
      }
    },

    // Content Engagement Events
    content: {
      sectionView: 'content_section_view',
      accordionOpen: 'accordion_item_open',
      testimonialView: 'testimonial_view',
      videoPlay: 'video_play',
      videoComplete: 'video_complete',
      resourceDownload: 'resource_download'
    },

    // Navigation Events
    navigation: {
      menuClick: 'navigation_menu_click',
      footerClick: 'navigation_footer_click',
      externalLink: 'external_link_click'
    },

    // Scroll Milestones
    scroll: {
      depth25: 'scroll_depth_25',
      depth50: 'scroll_depth_50',
      depth75: 'scroll_depth_75',
      depth90: 'scroll_depth_90',
      depth100: 'scroll_depth_100'
    },

    // Engagement Time Milestones
    engagement: {
      time15s: 'engaged_15_seconds',
      time30s: 'engaged_30_seconds',
      time60s: 'engaged_60_seconds',
      time180s: 'engaged_180_seconds'
    }
  },

  // Conversion Values
  conversionValues: {
    strategySessionBooking: {
      value: 150, // Estimated value of a free strategy session lead
      currency: 'USD'
    },
    newsletterSignup: {
      value: 5,
      currency: 'USD'
    },
    resourceDownload: {
      value: 10,
      currency: 'USD'
    }
  },

  // User Properties / Custom Dimensions
  userProperties: {
    businessType: 'business_type', // freelancer, consultant, agency
    industry: 'industry',
    businessStage: 'business_stage', // startup, growth, established
    referralSource: 'referral_source',
    contentInterests: 'content_interests'
  },

  // Privacy & Consent Settings
  privacy: {
    // Default consent state before user interaction
    defaultConsent: {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted'
    },
    // Cookie expiration in days
    cookieExpiration: 365,
    // IP anonymization
    anonymizeIp: true,
    // Data retention period in months
    dataRetention: 14
  },

  // Debug & Development Settings
  debug: {
    // Enable console logging of events
    logEvents: process.env.NODE_ENV === 'development',
    // Enable GTM preview mode
    gtmPreview: process.env.NODE_ENV === 'development',
    // Enable GA4 DebugView
    ga4Debug: process.env.NODE_ENV === 'development',
    // Disable tracking in development
    disableInDev: false
  },

  // A/B Testing Configuration
  abTesting: {
    enabled: true,
    experiments: {
      heroMessage: {
        id: 'hero_message_test',
        variants: ['control', 'variant_a', 'variant_b'],
        allocation: [0.34, 0.33, 0.33]
      },
      ctaButton: {
        id: 'cta_button_test',
        variants: ['control', 'variant_a'],
        allocation: [0.5, 0.5]
      }
    }
  },

  // Performance Metrics
  performance: {
    // Track Core Web Vitals
    webVitals: true,
    // Custom performance marks
    customMarks: {
      heroLoaded: 'hero_section_loaded',
      formReady: 'form_interaction_ready',
      aboveFoldComplete: 'above_fold_complete'
    }
  }
};

// Environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  analyticsConfig.debug.logEvents = false;
  analyticsConfig.debug.gtmPreview = false;
  analyticsConfig.debug.ga4Debug = false;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = analyticsConfig;
} else {
  window.analyticsConfig = analyticsConfig;
}