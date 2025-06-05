const morgan = require('morgan');
const expressWinston = require('express-winston');
const responseTime = require('response-time');
const logger = require('../../config/monitoring/logger.config');
const { register, metrics, helpers } = require('../../config/monitoring/metrics.config');
const { Sentry, sentryErrorHandler } = require('../../config/monitoring/sentry.config');

// Request ID middleware
function requestIdMiddleware(req, res, next) {
  req.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  res.setHeader('X-Request-ID', req.id);
  next();
}

// Response time tracking middleware
function responseTimeMiddleware() {
  return responseTime((req, res, time) => {
    helpers.recordHttpMetrics(req, res, time / 1000);
    
    // Log slow requests
    if (time > 1000) {
      logger.warn('Slow request detected', {
        requestId: req.id,
        method: req.method,
        url: req.url,
        duration: time,
        userAgent: req.get('user-agent')
      });
    }
  });
}

// Morgan HTTP logging middleware
function httpLoggingMiddleware() {
  return morgan((tokens, req, res) => {
    return JSON.stringify({
      requestId: req.id,
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, 'content-length'),
      responseTime: tokens['response-time'](req, res),
      remoteAddr: tokens['remote-addr'](req, res),
      userAgent: tokens['user-agent'](req, res),
      referrer: tokens.referrer(req, res)
    });
  }, { 
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400 && process.env.LOG_LEVEL !== 'debug'
  });
}

// Express Winston request logging
function requestLoggingMiddleware() {
  return expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: false,
    colorize: false,
    ignoreRoute: (req, res) => {
      // Skip health check endpoints
      return req.url === '/health' || req.url === '/metrics';
    }
  });
}

// Express Winston error logging
function errorLoggingMiddleware() {
  return expressWinston.errorLogger({
    winstonInstance: logger,
    meta: true,
    msg: 'Error: {{err.message}}',
    blacklistedMetaFields: ['password', 'token', 'apiKey']
  });
}

// Prometheus metrics endpoint
function metricsEndpoint(req, res) {
  res.set('Content-Type', register.contentType);
  register.metrics().then(data => res.end(data));
}

// Health check endpoint
function healthCheckEndpoint(req, res) {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid,
    version: process.version,
    env: process.env.NODE_ENV || 'development'
  };
  
  logger.info('Health check performed', health);
  res.json(health);
}

// Performance monitoring middleware
function performanceMonitoring() {
  return (req, res, next) => {
    const start = Date.now();
    
    // Override res.json to capture response data
    const originalJson = res.json;
    res.json = function(data) {
      const duration = Date.now() - start;
      
      // Log performance metrics
      logger.info('Request completed', {
        type: 'performance',
        requestId: req.id,
        method: req.method,
        path: req.path,
        duration: duration,
        statusCode: res.statusCode,
        responseSize: JSON.stringify(data).length
      });
      
      // Record API response time
      metrics.apiResponseTime.observe({
        endpoint: req.path,
        method: req.method
      }, duration / 1000);
      
      return originalJson.call(this, data);
    };
    
    next();
  };
}

// Error tracking middleware
function errorTrackingMiddleware(err, req, res, next) {
  const errorId = `${req.id}-error`;
  
  // Log error
  logger.error('Application error', {
    errorId,
    requestId: req.id,
    error: {
      message: err.message,
      stack: err.stack,
      code: err.code,
      statusCode: err.statusCode || 500
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body
    }
  });
  
  // Increment error counter
  metrics.errorCounter.inc({
    error_type: err.name || 'UnknownError',
    severity: err.statusCode >= 500 ? 'critical' : 'error'
  });
  
  // Pass to Sentry
  sentryErrorHandler(err, req, res, next);
}

// Agent monitoring middleware (for agent-based architecture)
function agentMonitoring(agentType) {
  return (req, res, next) => {
    const taskStart = Date.now();
    
    // Override res.end to capture task completion
    const originalEnd = res.end;
    res.end = function(...args) {
      const duration = (Date.now() - taskStart) / 1000;
      const taskType = req.body?.taskType || 'unknown';
      const status = res.statusCode < 400 ? 'success' : 'failure';
      
      // Record agent metrics
      metrics.agentTaskCounter.inc({
        agent_type: agentType,
        task_type: taskType,
        status: status
      });
      
      metrics.agentTaskDuration.observe({
        agent_type: agentType,
        task_type: taskType
      }, duration);
      
      logger.info('Agent task completed', {
        agentType,
        taskType,
        duration,
        status,
        requestId: req.id
      });
      
      return originalEnd.apply(this, args);
    };
    
    next();
  };
}

// Apply all monitoring middleware to an Express app
function applyMonitoring(app, options = {}) {
  const {
    enableSentry = true,
    enableMetrics = true,
    enableHealthCheck = true,
    agentType = null
  } = options;
  
  // Request ID (should be first)
  app.use(requestIdMiddleware);
  
  // Sentry request handler (should be early)
  if (enableSentry) {
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }
  
  // Response time tracking
  app.use(responseTimeMiddleware());
  
  // HTTP logging
  app.use(httpLoggingMiddleware());
  
  // Request logging
  app.use(requestLoggingMiddleware());
  
  // Performance monitoring
  app.use(performanceMonitoring());
  
  // Agent monitoring (if applicable)
  if (agentType) {
    app.use(agentMonitoring(agentType));
  }
  
  // Health and metrics endpoints
  if (enableHealthCheck) {
    app.get('/health', healthCheckEndpoint);
  }
  
  if (enableMetrics) {
    app.get('/metrics', metricsEndpoint);
  }
  
  // Error handling (should be last)
  app.use(errorLoggingMiddleware());
  app.use(errorTrackingMiddleware);
  
  if (enableSentry) {
    app.use(Sentry.Handlers.errorHandler());
  }
  
  logger.info('Monitoring middleware applied', {
    enableSentry,
    enableMetrics,
    enableHealthCheck,
    agentType
  });
}

module.exports = {
  requestIdMiddleware,
  responseTimeMiddleware,
  httpLoggingMiddleware,
  requestLoggingMiddleware,
  errorLoggingMiddleware,
  performanceMonitoring,
  errorTrackingMiddleware,
  agentMonitoring,
  metricsEndpoint,
  healthCheckEndpoint,
  applyMonitoring
};