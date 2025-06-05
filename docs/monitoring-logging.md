# Monitoring & Logging Documentation

## Overview

The Business of One application includes a comprehensive monitoring and logging system that provides:

- **Centralized Logging** with Winston and log rotation
- **Metrics Collection** with Prometheus
- **Error Tracking** with Sentry
- **Health Checks** for application and infrastructure
- **Log Analysis** tools for troubleshooting
- **Visualization** with Grafana dashboards
- **Alerting** with AlertManager

## Components

### 1. Logging (Winston)

#### Configuration
- **Location**: `config/monitoring/logger.config.js`
- **Log Levels**: error, warn, info, http, verbose, debug, silly
- **Outputs**:
  - Console (colored output)
  - Daily rotating files (application, error, performance)
  - Exception and rejection handlers

#### Usage
```javascript
const logger = require('./config/monitoring/logger.config');

// Basic logging
logger.info('User logged in', { userId: 123 });
logger.error('Database connection failed', error);
logger.warn('API rate limit approaching', { remaining: 10 });

// Performance logging
logger.info('API request completed', { 
  type: 'performance',
  duration: 150,
  endpoint: '/api/users'
});
```

### 2. Metrics (Prometheus)

#### Configuration
- **Location**: `config/monitoring/metrics.config.js`
- **Endpoint**: `/metrics`
- **Port**: 3000 (same as application)

#### Available Metrics
- HTTP request duration and count
- Active users gauge
- Business process counters
- API response times
- Database query duration
- Error counters
- Cache hit/miss rates
- Memory usage
- Agent task metrics

#### Usage
```javascript
const { metrics } = require('./config/monitoring/metrics.config');

// Increment counter
metrics.businessProcesses.inc({ 
  process_type: 'invoice_generation',
  status: 'success'
});

// Record histogram
metrics.apiResponseTime.observe({
  endpoint: '/api/users',
  method: 'GET'
}, 0.150); // 150ms

// Update gauge
metrics.activeUsers.set({ user_type: 'premium' }, 42);
```

### 3. Error Tracking (Sentry)

#### Configuration
- **Location**: `config/monitoring/sentry.config.js`
- **DSN**: Set in `SENTRY_DSN` environment variable

#### Features
- Automatic error capture
- Performance monitoring
- Release tracking
- User context
- Custom breadcrumbs
- Error filtering

#### Usage
```javascript
const { captureEvent, addBreadcrumb } = require('./config/monitoring/sentry.config');

// Add breadcrumb
addBreadcrumb('User action', 'user', { action: 'clicked_button' });

// Capture custom event
captureEvent('Payment processed', 'info', { 
  amount: 100,
  currency: 'USD'
});

// Errors are automatically captured through middleware
```

### 4. Health Checks

#### Running Health Checks
```bash
npm run monitor
```

#### Checks Performed
- Application server availability
- Metrics endpoint availability
- Disk space (min 10% free)
- Memory usage (max 90%)
- Log directory accessibility
- DNS resolution

#### HTTP Endpoint
- **URL**: `/health`
- **Response**: JSON with health status

### 5. Log Analysis

#### Running Log Analysis
```bash
npm run logs:analyze
```

#### Analysis Features
- Error rate calculation
- Status code distribution
- Slowest requests identification
- Error-prone endpoints
- Hourly statistics
- Automated recommendations

## Middleware Integration

### Express Integration
```javascript
const { applyMonitoring } = require('./scripts/monitoring/middleware');
const { initializeSentry } = require('./config/monitoring/sentry.config');

// Initialize Sentry
if (process.env.SENTRY_DSN) {
  initializeSentry(app);
}

// Apply all monitoring middleware
applyMonitoring(app, {
  enableSentry: true,
  enableMetrics: true,
  enableHealthCheck: true,
  agentType: 'api-server' // Optional: for agent-specific metrics
});
```

### Middleware Stack
1. Request ID generation
2. Sentry request handler
3. Response time tracking
4. HTTP request logging
5. Performance monitoring
6. Error logging and tracking

## Docker Monitoring Stack

### Starting the Stack
```bash
docker-compose -f docker-compose.monitoring.yml up -d
```

### Services
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)
- **AlertManager**: http://localhost:9093
- **Loki**: http://localhost:3100
- **Node Exporter**: http://localhost:9100
- **cAdvisor**: http://localhost:8080

## Environment Variables

Required environment variables (see `.env.example`):
```bash
# Logging
LOG_LEVEL=info

# Sentry
SENTRY_DSN=your-sentry-dsn
RELEASE_VERSION=1.0.0

# Monitoring URLs
APP_URL=http://localhost:3000/health
METRICS_URL=http://localhost:3000/metrics
```

## Best Practices

### Logging
1. Use appropriate log levels
2. Include request IDs for tracing
3. Avoid logging sensitive data
4. Use structured logging (JSON)
5. Include relevant context

### Metrics
1. Use appropriate metric types (counter, gauge, histogram)
2. Keep cardinality low for labels
3. Name metrics consistently
4. Document what each metric measures

### Error Handling
1. Log errors before responding
2. Include stack traces in development
3. Sanitize error messages in production
4. Track error rates and patterns

### Performance
1. Monitor slow requests (>1s)
2. Track database query times
3. Monitor memory usage
4. Set up alerts for anomalies

## Troubleshooting

### Common Issues

#### High Error Rate
1. Run log analysis: `npm run logs:analyze`
2. Check recent errors in logs
3. Review error-prone endpoints
4. Check Sentry for error details

#### Slow Performance
1. Check slow request logs
2. Review performance metrics in Grafana
3. Analyze database query times
4. Check memory usage

#### Missing Metrics
1. Verify Prometheus is running
2. Check scrape targets in Prometheus UI
3. Ensure metrics endpoint is accessible
4. Review application logs for errors

## Alerting Rules

Example Prometheus alert rules:
```yaml
groups:
  - name: businessofone
    rules:
      - alert: HighErrorRate
        expr: rate(businessofone_errors_total[5m]) > 0.05
        for: 5m
        annotations:
          summary: "High error rate detected"
          
      - alert: SlowRequests
        expr: histogram_quantile(0.95, businessofone_http_request_duration_seconds) > 1
        for: 10m
        annotations:
          summary: "95th percentile response time > 1s"
```

## Dashboard Templates

Grafana dashboards are available in `config/monitoring/grafana/dashboards/`:
- Application Overview
- Error Analysis
- Performance Metrics
- System Resources

## Security Considerations

1. **Log Sanitization**: Sensitive data is automatically redacted
2. **Metric Labels**: Avoid high-cardinality data
3. **Access Control**: Secure monitoring endpoints in production
4. **Data Retention**: Configure appropriate retention policies

## Maintenance

### Log Rotation
- Logs rotate daily
- Compressed after rotation
- Retained for 14 days (configurable)
- Error logs retained for 30 days

### Metric Retention
- Prometheus retention: 15 days (default)
- Configure in `prometheus.yml`

### Regular Tasks
1. Review log analysis weekly
2. Update alerting thresholds based on baselines
3. Archive old logs if needed
4. Review and optimize slow queries
5. Update dashboards as needed