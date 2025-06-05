const prometheus = require('prom-client');

// Create a Registry
const register = new prometheus.Registry();

// Add default metrics
prometheus.collectDefaultMetrics({ 
  register,
  prefix: 'businessofone_'
});

// Custom metrics

// HTTP request duration histogram
const httpRequestDuration = new prometheus.Histogram({
  name: 'businessofone_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// HTTP request counter
const httpRequestTotal = new prometheus.Counter({
  name: 'businessofone_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Active users gauge
const activeUsers = new prometheus.Gauge({
  name: 'businessofone_active_users',
  help: 'Number of active users',
  labelNames: ['user_type']
});

// Business processes counter
const businessProcesses = new prometheus.Counter({
  name: 'businessofone_business_processes_total',
  help: 'Total number of business processes executed',
  labelNames: ['process_type', 'status']
});

// API response time histogram
const apiResponseTime = new prometheus.Histogram({
  name: 'businessofone_api_response_time_seconds',
  help: 'API response time in seconds',
  labelNames: ['endpoint', 'method'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

// Database query duration
const dbQueryDuration = new prometheus.Histogram({
  name: 'businessofone_db_query_duration_seconds',
  help: 'Database query duration in seconds',
  labelNames: ['operation', 'table'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1]
});

// Error counter
const errorCounter = new prometheus.Counter({
  name: 'businessofone_errors_total',
  help: 'Total number of errors',
  labelNames: ['error_type', 'severity']
});

// Cache hit/miss counter
const cacheCounter = new prometheus.Counter({
  name: 'businessofone_cache_operations_total',
  help: 'Total number of cache operations',
  labelNames: ['operation', 'result']
});

// Memory usage gauge
const memoryUsage = new prometheus.Gauge({
  name: 'businessofone_memory_usage_bytes',
  help: 'Memory usage in bytes',
  labelNames: ['type']
});

// Agent task metrics
const agentTaskCounter = new prometheus.Counter({
  name: 'businessofone_agent_tasks_total',
  help: 'Total number of agent tasks executed',
  labelNames: ['agent_type', 'task_type', 'status']
});

const agentTaskDuration = new prometheus.Histogram({
  name: 'businessofone_agent_task_duration_seconds',
  help: 'Agent task execution duration in seconds',
  labelNames: ['agent_type', 'task_type'],
  buckets: [1, 5, 10, 30, 60, 120, 300, 600]
});

// Register all metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeUsers);
register.registerMetric(businessProcesses);
register.registerMetric(apiResponseTime);
register.registerMetric(dbQueryDuration);
register.registerMetric(errorCounter);
register.registerMetric(cacheCounter);
register.registerMetric(memoryUsage);
register.registerMetric(agentTaskCounter);
register.registerMetric(agentTaskDuration);

// Helper function to record HTTP metrics
function recordHttpMetrics(req, res, duration) {
  const labels = {
    method: req.method,
    route: req.route?.path || req.path,
    status_code: res.statusCode
  };
  
  httpRequestDuration.observe(labels, duration);
  httpRequestTotal.inc(labels);
}

// Helper function to update memory metrics
function updateMemoryMetrics() {
  const memUsage = process.memoryUsage();
  memoryUsage.set({ type: 'rss' }, memUsage.rss);
  memoryUsage.set({ type: 'heapTotal' }, memUsage.heapTotal);
  memoryUsage.set({ type: 'heapUsed' }, memUsage.heapUsed);
  memoryUsage.set({ type: 'external' }, memUsage.external);
}

// Update memory metrics every 10 seconds
setInterval(updateMemoryMetrics, 10000);

module.exports = {
  register,
  metrics: {
    httpRequestDuration,
    httpRequestTotal,
    activeUsers,
    businessProcesses,
    apiResponseTime,
    dbQueryDuration,
    errorCounter,
    cacheCounter,
    memoryUsage,
    agentTaskCounter,
    agentTaskDuration
  },
  helpers: {
    recordHttpMetrics,
    updateMemoryMetrics
  }
};