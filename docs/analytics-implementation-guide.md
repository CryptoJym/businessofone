# Analytics Implementation Guide

This guide shows how to integrate the analytics and tracking setup into your Business of One landing page.

## Quick Start

### 1. Include Analytics Scripts

Add these scripts to your HTML `<head>` section:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
  <!-- End Google Tag Manager -->
  
  <!-- Analytics Configuration -->
  <script src="/config/analytics.config.js"></script>
  
  <!-- Analytics Library -->
  <script src="/lib/analytics.js"></script>
  
  <!-- Cookie Consent -->
  <script src="/components/CookieConsent.js"></script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  
  <!-- Your content -->
</body>
</html>
```

### 2. Update Configuration

Edit `/config/analytics.config.js` and replace placeholder IDs:

```javascript
// Google Tag Manager
gtm: {
  containerId: 'GTM-YOUR-ID', // Replace with your GTM container ID
},

// Google Analytics 4
ga4: {
  measurementId: 'G-YOUR-ID', // Replace with your GA4 measurement ID
},

// Facebook Pixel
facebook: {
  pixelId: 'YOUR-PIXEL-ID', // Replace with your Facebook Pixel ID
},

// Microsoft Clarity
clarity: {
  projectId: 'YOUR-PROJECT-ID', // Replace with your Clarity project ID
}
```

### 3. Basic Event Tracking

Track events using the analytics library:

```javascript
// Track primary CTA click
document.getElementById('primary-cta').addEventListener('click', () => {
  analytics.trackEvent('primary_cta_click', {
    button_text: 'Get Your Free Business Strategy Session',
    location: 'hero_section'
  });
});

// Track form submission
document.getElementById('strategy-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Track form submission
  analytics.trackFormInteraction('strategySession', 'submit');
  
  // Track conversion
  analytics.trackConversion('strategySessionBooking');
  
  // Submit form...
});
```

## Common Implementation Patterns

### 1. Hero Section Tracking

```javascript
// Track hero section visibility
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      analytics.trackEvent('hero_section_view', {
        time_to_view: performance.now()
      });
      heroObserver.unobserve(entry.target);
    }
  });
});

heroObserver.observe(document.querySelector('.hero-section'));
```

### 2. Form Field Tracking

```javascript
// Track form field interactions
const formFields = document.querySelectorAll('#strategy-form input, #strategy-form select');

formFields.forEach(field => {
  // Track field focus
  field.addEventListener('focus', () => {
    analytics.trackFormInteraction('strategySession', 'fieldInteraction', field.name);
  });
  
  // Track field completion
  field.addEventListener('blur', () => {
    if (field.value) {
      analytics.trackEvent('form_field_completed', {
        field_name: field.name,
        form_name: 'strategy_session'
      });
    }
  });
});
```

### 3. Content Engagement Tracking

```javascript
// Track accordion/FAQ interactions
document.querySelectorAll('.faq-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    analytics.trackEvent('faq_item_clicked', {
      question: item.querySelector('.faq-question').textContent,
      position: index + 1
    });
  });
});

// Track testimonial views
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      analytics.trackEvent('testimonial_view', {
        testimonial_id: entry.target.dataset.testimonialId,
        author: entry.target.dataset.author
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.testimonial').forEach(testimonial => {
  testimonialObserver.observe(testimonial);
});
```

### 4. A/B Testing Implementation

```javascript
// Get experiment variant
function getExperimentVariant(experimentName) {
  const experiment = analyticsConfig.abTesting.experiments[experimentName];
  if (!experiment) return 'control';
  
  // Simple random allocation based on percentages
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < experiment.variants.length; i++) {
    sum += experiment.allocation[i];
    if (random < sum) {
      return experiment.variants[i];
    }
  }
  
  return experiment.variants[0];
}

// Apply variant
const heroVariant = getExperimentVariant('heroMessage');
analytics.trackExperiment('heroMessage', heroVariant);

// Apply different content based on variant
switch(heroVariant) {
  case 'variant_a':
    document.querySelector('.hero-title').textContent = 'Scale Your Solo Business to 7 Figures';
    break;
  case 'variant_b':
    document.querySelector('.hero-title').textContent = 'Build a Business That Runs Without You';
    break;
  default:
    // Keep original content
}
```

### 5. Enhanced Ecommerce Tracking (Future)

```javascript
// Track product impressions
analytics.trackEvent('view_item_list', {
  item_list_name: 'Services',
  items: [
    {
      item_id: 'strategy-session',
      item_name: 'Business Strategy Session',
      price: 0,
      currency: 'USD',
      item_category: 'Consultation'
    },
    {
      item_id: 'growth-accelerator',
      item_name: 'Growth Accelerator Program',
      price: 2997,
      currency: 'USD',
      item_category: 'Program'
    }
  ]
});

// Track add to cart
analytics.trackEvent('add_to_cart', {
  currency: 'USD',
  value: 2997,
  items: [{
    item_id: 'growth-accelerator',
    item_name: 'Growth Accelerator Program',
    price: 2997,
    quantity: 1
  }]
});
```

## User Properties Setup

Set user properties for better segmentation:

```javascript
// Set user properties based on form data
function setUserProperties(formData) {
  if (formData.businessType) {
    analytics.setUserProperty('businessType', formData.businessType);
  }
  
  if (formData.industry) {
    analytics.setUserProperty('industry', formData.industry);
  }
  
  if (formData.revenue) {
    const stage = formData.revenue < 100000 ? 'startup' : 
                  formData.revenue < 500000 ? 'growth' : 'established';
    analytics.setUserProperty('businessStage', stage);
  }
}
```

## Cookie Consent Integration

The cookie consent banner will automatically appear on first visit. To manually show preferences:

```javascript
// Show cookie preferences
document.getElementById('cookie-preferences-link').addEventListener('click', (e) => {
  e.preventDefault();
  window.cookieConsent.showPreferences();
});

// Listen for consent changes
window.addEventListener('cookieConsentUpdated', (e) => {
  console.log('Consent updated:', e.detail);
  // Reload analytics if needed
});
```

## Testing Your Implementation

### 1. Enable Debug Mode

```javascript
// In development, analytics will automatically log events
// You can also manually enable debug mode:
analyticsConfig.debug.logEvents = true;
```

### 2. Use Browser Extensions

- **Google Tag Assistant**: Verify GTM and GA4 setup
- **Facebook Pixel Helper**: Check Facebook Pixel events
- **GA Debugger**: Debug Google Analytics implementation

### 3. Use Preview Mode

1. Open Google Tag Manager
2. Click "Preview" button
3. Enter your website URL
4. Test all interactions and verify tags fire correctly

### 4. Check Real-Time Reports

1. Open Google Analytics 4
2. Go to Reports → Real-time
3. Perform actions on your site
4. Verify events appear in real-time

## Troubleshooting

### Events Not Firing

1. Check browser console for errors
2. Verify configuration IDs are correct
3. Ensure cookie consent is granted
4. Check if ad blockers are interfering

### Duplicate Events

1. Check if GTM and direct GA4 are both firing
2. Verify tags are set to fire once per event
3. Check for multiple event listeners

### Missing Data

1. Verify all required parameters are sent
2. Check data layer pushes in console
3. Ensure proper data types (strings, numbers)

## Performance Optimization

### 1. Lazy Load Analytics

```javascript
// Load analytics after critical content
window.addEventListener('load', () => {
  setTimeout(() => {
    // Load analytics scripts
    loadAnalytics();
  }, 1000);
});
```

### 2. Batch Events

```javascript
// Batch multiple events
const eventQueue = [];

function queueEvent(eventName, parameters) {
  eventQueue.push({ eventName, parameters, timestamp: Date.now() });
  
  if (eventQueue.length >= 10) {
    flushEventQueue();
  }
}

function flushEventQueue() {
  eventQueue.forEach(event => {
    analytics.trackEvent(event.eventName, event.parameters);
  });
  eventQueue.length = 0;
}

// Flush on page unload
window.addEventListener('beforeunload', flushEventQueue);
```

## Next Steps

1. **Set up Goals in GA4**: Configure conversion events as goals
2. **Create Audiences**: Build remarketing audiences based on behavior
3. **Configure Alerts**: Set up alerts for traffic drops or anomalies
4. **Build Dashboards**: Create custom reports for key metrics
5. **Implement Server-Side Tracking**: Add server-side events for better accuracy

## Support

For questions or issues:
1. Check the browser console for errors
2. Review the GTM Preview mode
3. Consult the analytics documentation
4. Test in incognito mode to rule out extensions