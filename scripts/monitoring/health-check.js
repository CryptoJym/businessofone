#!/usr/bin/env node

const http = require('http');
const https = require('https');
const dns = require('dns').promises;
const fs = require('fs').promises;
const path = require('path');
const logger = require('../../config/monitoring/logger.config');

// Health check configuration
const config = {
  services: [
    {
      name: 'Application Server',
      type: 'http',
      url: process.env.APP_URL || 'http://localhost:3000/health',
      timeout: 5000
    },
    {
      name: 'Metrics Endpoint',
      type: 'http',
      url: process.env.METRICS_URL || 'http://localhost:3000/metrics',
      timeout: 5000
    }
  ],
  checks: [
    {
      name: 'Disk Space',
      type: 'disk',
      path: '/',
      minFreePercent: 10
    },
    {
      name: 'Memory Usage',
      type: 'memory',
      maxUsagePercent: 90
    },
    {
      name: 'Log Directory',
      type: 'directory',
      path: './logs',
      writable: true
    },
    {
      name: 'DNS Resolution',
      type: 'dns',
      hostname: 'google.com'
    }
  ]
};

// Health check result structure
class HealthCheckResult {
  constructor(name, status, message = '', details = {}) {
    this.name = name;
    this.status = status; // 'healthy', 'degraded', 'unhealthy'
    this.message = message;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// HTTP health check
async function checkHttp(service) {
  return new Promise((resolve) => {
    const url = new URL(service.url);
    const client = url.protocol === 'https:' ? https : http;
    
    const startTime = Date.now();
    const timeout = setTimeout(() => {
      resolve(new HealthCheckResult(
        service.name,
        'unhealthy',
        `Request timeout after ${service.timeout}ms`,
        { url: service.url }
      ));
    }, service.timeout);
    
    const req = client.get(service.url, (res) => {
      clearTimeout(timeout);
      const responseTime = Date.now() - startTime;
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const status = res.statusCode >= 200 && res.statusCode < 300 ? 'healthy' : 'unhealthy';
        resolve(new HealthCheckResult(
          service.name,
          status,
          `HTTP ${res.statusCode} - Response time: ${responseTime}ms`,
          {
            url: service.url,
            statusCode: res.statusCode,
            responseTime,
            headers: res.headers
          }
        ));
      });
    });
    
    req.on('error', (err) => {
      clearTimeout(timeout);
      resolve(new HealthCheckResult(
        service.name,
        'unhealthy',
        `Connection error: ${err.message}`,
        { url: service.url, error: err.message }
      ));
    });
    
    req.end();
  });
}

// Disk space check
async function checkDiskSpace(check) {
  try {
    const { execSync } = require('child_process');
    const dfOutput = execSync(`df -h ${check.path}`).toString();
    const lines = dfOutput.trim().split('\n');
    const data = lines[1].split(/\s+/);
    const usedPercent = parseInt(data[4]);
    const freePercent = 100 - usedPercent;
    
    const status = freePercent >= check.minFreePercent ? 'healthy' : 'unhealthy';
    return new HealthCheckResult(
      check.name,
      status,
      `${freePercent}% free space available`,
      {
        path: check.path,
        total: data[1],
        used: data[2],
        available: data[3],
        usedPercent,
        freePercent
      }
    );
  } catch (err) {
    return new HealthCheckResult(
      check.name,
      'unhealthy',
      `Failed to check disk space: ${err.message}`,
      { error: err.message }
    );
  }
}

// Memory usage check
async function checkMemoryUsage(check) {
  const memUsage = process.memoryUsage();
  const totalMem = require('os').totalmem();
  const freeMem = require('os').freemem();
  const usedPercent = ((totalMem - freeMem) / totalMem) * 100;
  
  const status = usedPercent <= check.maxUsagePercent ? 'healthy' : 'unhealthy';
  return new HealthCheckResult(
    check.name,
    status,
    `Memory usage: ${usedPercent.toFixed(2)}%`,
    {
      totalMem: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
      freeMem: `${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
      usedPercent: usedPercent.toFixed(2),
      processMemory: {
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`
      }
    }
  );
}

// Directory check
async function checkDirectory(check) {
  try {
    const dirPath = path.resolve(check.path);
    const stats = await fs.stat(dirPath);
    
    if (!stats.isDirectory()) {
      return new HealthCheckResult(
        check.name,
        'unhealthy',
        `Path is not a directory: ${dirPath}`,
        { path: dirPath }
      );
    }
    
    if (check.writable) {
      const testFile = path.join(dirPath, `.healthcheck-${Date.now()}`);
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);
    }
    
    return new HealthCheckResult(
      check.name,
      'healthy',
      `Directory accessible${check.writable ? ' and writable' : ''}`,
      { path: dirPath }
    );
  } catch (err) {
    return new HealthCheckResult(
      check.name,
      'unhealthy',
      `Directory check failed: ${err.message}`,
      { path: check.path, error: err.message }
    );
  }
}

// DNS check
async function checkDNS(check) {
  try {
    const startTime = Date.now();
    const addresses = await dns.resolve4(check.hostname);
    const resolveTime = Date.now() - startTime;
    
    return new HealthCheckResult(
      check.name,
      'healthy',
      `DNS resolution successful in ${resolveTime}ms`,
      {
        hostname: check.hostname,
        addresses,
        resolveTime
      }
    );
  } catch (err) {
    return new HealthCheckResult(
      check.name,
      'unhealthy',
      `DNS resolution failed: ${err.message}`,
      { hostname: check.hostname, error: err.message }
    );
  }
}

// Run a single check
async function runCheck(check) {
  switch (check.type) {
    case 'disk':
      return checkDiskSpace(check);
    case 'memory':
      return checkMemoryUsage(check);
    case 'directory':
      return checkDirectory(check);
    case 'dns':
      return checkDNS(check);
    default:
      return new HealthCheckResult(
        check.name,
        'unhealthy',
        `Unknown check type: ${check.type}`
      );
  }
}

// Run all health checks
async function runHealthChecks() {
  logger.info('Starting health checks');
  
  const results = [];
  
  // Check services
  for (const service of config.services) {
    if (service.type === 'http') {
      results.push(await checkHttp(service));
    }
  }
  
  // Run other checks
  for (const check of config.checks) {
    results.push(await runCheck(check));
  }
  
  // Calculate overall health
  const unhealthyCount = results.filter(r => r.status === 'unhealthy').length;
  const degradedCount = results.filter(r => r.status === 'degraded').length;
  
  let overallStatus = 'healthy';
  if (unhealthyCount > 0) {
    overallStatus = 'unhealthy';
  } else if (degradedCount > 0) {
    overallStatus = 'degraded';
  }
  
  const summary = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    totalChecks: results.length,
    healthy: results.filter(r => r.status === 'healthy').length,
    degraded: degradedCount,
    unhealthy: unhealthyCount,
    checks: results
  };
  
  // Log results
  logger.info('Health check completed', summary);
  
  // Log individual failures
  results.filter(r => r.status !== 'healthy').forEach(result => {
    logger.warn(`Health check failed: ${result.name}`, result);
  });
  
  return summary;
}

// Main execution
if (require.main === module) {
  runHealthChecks()
    .then(summary => {
      console.log(JSON.stringify(summary, null, 2));
      process.exit(summary.status === 'healthy' ? 0 : 1);
    })
    .catch(err => {
      logger.error('Health check error', err);
      console.error('Health check failed:', err.message);
      process.exit(2);
    });
}

module.exports = {
  runHealthChecks,
  checkHttp,
  checkDiskSpace,
  checkMemoryUsage,
  checkDirectory,
  checkDNS
};