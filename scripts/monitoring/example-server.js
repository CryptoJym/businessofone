const express = require('express');
const dotenv = require('dotenv');
const logger = require('../../config/monitoring/logger.config');
const { initializeSentry } = require('../../config/monitoring/sentry.config');
const { applyMonitoring } = require('./middleware');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Initialize Sentry before other middleware
if (process.env.SENTRY_DSN) {
  initializeSentry(app);
}

// Apply body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply all monitoring middleware
applyMonitoring(app, {
  enableSentry: !!process.env.SENTRY_DSN,
  enableMetrics: true,
  enableHealthCheck: true,
  agentType: 'example-server'
});

// Example routes

// Home route
app.get('/', (req, res) => {
  logger.info('Home page accessed', { requestId: req.id });
  res.json({ 
    message: 'Welcome to Business of One',
    requestId: req.id 
  });
});

// Example business process
app.post('/api/business-process', async (req, res, next) => {
  try {
    const { processType, data } = req.body;
    
    logger.info('Business process started', {
      requestId: req.id,
      processType,
      data
    });
    
    // Simulate some processing time
    const processingTime = Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Random chance of error for testing
    if (Math.random() < 0.1) {
      throw new Error('Random business process error');
    }
    
    // Log successful completion
    logger.info('Business process completed', {
      requestId: req.id,
      processType,
      processingTime
    });
    
    res.json({
      success: true,
      processType,
      processingTime,
      requestId: req.id
    });
    
  } catch (error) {
    next(error);
  }
});

// Example slow endpoint
app.get('/api/slow-endpoint', async (req, res) => {
  const delay = parseInt(req.query.delay) || 2000;
  
  logger.warn('Slow endpoint accessed', {
    requestId: req.id,
    delay
  });
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  res.json({
    message: 'Slow response',
    delay,
    requestId: req.id
  });
});

// Example error endpoint
app.get('/api/error', (req, res, next) => {
  const errorType = req.query.type || 'generic';
  
  logger.error('Error endpoint accessed', {
    requestId: req.id,
    errorType
  });
  
  const error = new Error(`Simulated ${errorType} error`);
  error.statusCode = errorType === 'client' ? 400 : 500;
  next(error);
});

// Example authenticated endpoint
app.get('/api/user/:id', (req, res) => {
  // Simulate user context
  req.user = {
    id: req.params.id,
    email: `user${req.params.id}@example.com`,
    username: `user${req.params.id}`
  };
  
  logger.info('User endpoint accessed', {
    requestId: req.id,
    userId: req.user.id
  });
  
  res.json({
    user: req.user,
    requestId: req.id
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn('404 - Route not found', {
    requestId: req.id,
    method: req.method,
    url: req.url
  });
  
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    requestId: req.id
  });
});

// Final error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Don't log client errors as errors
  if (statusCode >= 500) {
    logger.error('Unhandled error', {
      requestId: req.id,
      error: {
        message: err.message,
        stack: err.stack,
        statusCode
      }
    });
  }
  
  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal Server Error' : err.message,
    message: err.message,
    requestId: req.id,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info('Server started', {
    port: PORT,
    environment: process.env.NODE_ENV,
    pid: process.pid,
    version: process.version
  });
  
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Metrics: http://localhost:${PORT}/metrics`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  
  // Close server
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', { reason, promise });
});