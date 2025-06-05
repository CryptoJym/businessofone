const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

// Initialize Sentry
function initializeSentry(app) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      // Enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // Enable Express.js middleware tracing
      app && new Sentry.Integrations.Express({ app }),
      // Enable profiling
      new ProfilingIntegration(),
      // Additional integrations
      new Sentry.Integrations.OnUncaughtException({
        onFatalError: async (err) => {
          console.error('Fatal error occurred:', err);
          // Ensure error is sent to Sentry before exit
          await Sentry.close(2000);
          process.exit(1);
        }
      }),
      new Sentry.Integrations.OnUnhandledRejection({
        mode: 'strict'
      })
    ].filter(Boolean),
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Release tracking
    release: process.env.RELEASE_VERSION || '1.0.0',
    
    // Additional options
    attachStacktrace: true,
    autoSessionTracking: true,
    
    // Configure error filtering
    beforeSend(event, hint) {
      // Filter out specific errors if needed
      if (event.exception) {
        const error = hint.originalException;
        
        // Don't send certain types of errors
        if (error?.code === 'ECONNREFUSED') {
          return null;
        }
        
        // Add additional context
        event.extra = {
          ...event.extra,
          timestamp: new Date().toISOString(),
          processUptime: process.uptime()
        };
      }
      
      return event;
    },
    
    // Configure breadcrumbs
    beforeBreadcrumb(breadcrumb) {
      // Filter out sensitive data from breadcrumbs
      if (breadcrumb.category === 'console' && breadcrumb.level === 'debug') {
        return null;
      }
      
      // Sanitize data
      if (breadcrumb.data && breadcrumb.data.password) {
        breadcrumb.data.password = '[REDACTED]';
      }
      
      return breadcrumb;
    }
  });
}

// Custom error handler
function sentryErrorHandler(err, req, res, next) {
  // Add request context
  Sentry.withScope((scope) => {
    scope.setTag('request_id', req.id || 'unknown');
    scope.setTag('user_agent', req.get('user-agent') || 'unknown');
    scope.setContext('request', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body
    });
    
    // Add user context if available
    if (req.user) {
      scope.setUser({
        id: req.user.id,
        email: req.user.email,
        username: req.user.username
      });
    }
    
    // Capture the error
    Sentry.captureException(err);
  });
  
  next(err);
}

// Helper function to capture custom events
function captureEvent(message, level = 'info', extra = {}) {
  Sentry.captureMessage(message, level, {
    extra: {
      ...extra,
      timestamp: new Date().toISOString()
    }
  });
}

// Helper function to add breadcrumb
function addBreadcrumb(message, category = 'custom', data = {}) {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
    timestamp: Date.now() / 1000
  });
}

// Helper function to measure transaction
function startTransaction(name, op = 'custom') {
  return Sentry.startTransaction({
    op,
    name,
    data: {
      startTime: Date.now()
    }
  });
}

// Helper function to capture metrics
function captureMetric(name, value, unit = 'none', tags = {}) {
  Sentry.metrics.gauge(name, value, {
    unit,
    tags: {
      ...tags,
      environment: process.env.NODE_ENV || 'development'
    }
  });
}

module.exports = {
  initializeSentry,
  sentryErrorHandler,
  captureEvent,
  addBreadcrumb,
  startTransaction,
  captureMetric,
  Sentry
};