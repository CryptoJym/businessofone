#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const { createReadStream } = require('fs');
const logger = require('../../config/monitoring/logger.config');

// Analysis configuration
const config = {
  logDir: path.join(__dirname, '../../logs'),
  patterns: {
    error: /error|exception|failed|failure/i,
    warning: /warn|warning|caution/i,
    slowRequest: /duration"?:\s*(\d+)/,
    statusCode: /status"?:\s*"?(\d+)/,
    requestId: /requestId"?:\s*"?([a-zA-Z0-9-]+)/,
    timestamp: /timestamp"?:\s*"?([^",}]+)/,
    method: /method"?:\s*"?(\w+)/,
    path: /url"?:\s*"?([^",\s]+)|path"?:\s*"?([^",\s]+)/
  },
  thresholds: {
    slowRequestMs: 1000,
    errorRate: 0.05,
    warningRate: 0.1
  }
};

// Log entry parser
class LogEntry {
  constructor(line, lineNumber) {
    this.raw = line;
    this.lineNumber = lineNumber;
    this.parsed = this.parse(line);
  }
  
  parse(line) {
    try {
      // Try to parse as JSON first
      return JSON.parse(line);
    } catch {
      // Fallback to regex parsing
      const entry = {};
      
      // Extract timestamp
      const timestampMatch = line.match(config.patterns.timestamp);
      if (timestampMatch) {
        entry.timestamp = timestampMatch[1];
      }
      
      // Extract request ID
      const requestIdMatch = line.match(config.patterns.requestId);
      if (requestIdMatch) {
        entry.requestId = requestIdMatch[1];
      }
      
      // Extract HTTP method
      const methodMatch = line.match(config.patterns.method);
      if (methodMatch) {
        entry.method = methodMatch[1];
      }
      
      // Extract path/URL
      const pathMatch = line.match(config.patterns.path);
      if (pathMatch) {
        entry.path = pathMatch[1] || pathMatch[2];
      }
      
      // Extract status code
      const statusMatch = line.match(config.patterns.statusCode);
      if (statusMatch) {
        entry.status = parseInt(statusMatch[1]);
      }
      
      // Extract duration
      const durationMatch = line.match(config.patterns.slowRequest);
      if (durationMatch) {
        entry.duration = parseInt(durationMatch[1]);
      }
      
      // Check log level
      if (config.patterns.error.test(line)) {
        entry.level = 'error';
      } else if (config.patterns.warning.test(line)) {
        entry.level = 'warning';
      } else {
        entry.level = 'info';
      }
      
      entry.message = line;
      return entry;
    }
  }
  
  isError() {
    return this.parsed.level === 'error' || 
           (this.parsed.status && this.parsed.status >= 500);
  }
  
  isWarning() {
    return this.parsed.level === 'warning' || 
           (this.parsed.status && this.parsed.status >= 400 && this.parsed.status < 500);
  }
  
  isSlowRequest() {
    return this.parsed.duration && this.parsed.duration > config.thresholds.slowRequestMs;
  }
}

// Log file analyzer
class LogAnalyzer {
  constructor() {
    this.stats = {
      totalLines: 0,
      totalRequests: 0,
      errors: 0,
      warnings: 0,
      slowRequests: 0,
      statusCodes: {},
      endpoints: {},
      errorMessages: {},
      slowestRequests: [],
      recentErrors: [],
      hourlyStats: {}
    };
  }
  
  async analyzeFile(filePath) {
    const fileStream = createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    let lineNumber = 0;
    
    for await (const line of rl) {
      lineNumber++;
      if (!line.trim()) continue;
      
      const entry = new LogEntry(line, lineNumber);
      this.processEntry(entry);
    }
  }
  
  processEntry(entry) {
    this.stats.totalLines++;
    
    // Track requests
    if (entry.parsed.method || entry.parsed.status) {
      this.stats.totalRequests++;
      
      // Track status codes
      const status = entry.parsed.status || 'unknown';
      this.stats.statusCodes[status] = (this.stats.statusCodes[status] || 0) + 1;
      
      // Track endpoints
      const endpoint = `${entry.parsed.method || 'UNKNOWN'} ${entry.parsed.path || 'unknown'}`;
      if (!this.stats.endpoints[endpoint]) {
        this.stats.endpoints[endpoint] = {
          count: 0,
          errors: 0,
          totalDuration: 0,
          avgDuration: 0
        };
      }
      this.stats.endpoints[endpoint].count++;
      
      if (entry.parsed.duration) {
        this.stats.endpoints[endpoint].totalDuration += entry.parsed.duration;
        this.stats.endpoints[endpoint].avgDuration = 
          this.stats.endpoints[endpoint].totalDuration / this.stats.endpoints[endpoint].count;
      }
    }
    
    // Track errors
    if (entry.isError()) {
      this.stats.errors++;
      
      // Track error messages
      const errorMsg = entry.parsed.message || entry.raw;
      const errorKey = this.normalizeErrorMessage(errorMsg);
      this.stats.errorMessages[errorKey] = (this.stats.errorMessages[errorKey] || 0) + 1;
      
      // Keep recent errors
      this.stats.recentErrors.push({
        timestamp: entry.parsed.timestamp,
        message: errorMsg,
        line: entry.lineNumber
      });
      if (this.stats.recentErrors.length > 100) {
        this.stats.recentErrors.shift();
      }
      
      // Track endpoint errors
      const endpoint = `${entry.parsed.method || 'UNKNOWN'} ${entry.parsed.path || 'unknown'}`;
      if (this.stats.endpoints[endpoint]) {
        this.stats.endpoints[endpoint].errors++;
      }
    }
    
    // Track warnings
    if (entry.isWarning()) {
      this.stats.warnings++;
    }
    
    // Track slow requests
    if (entry.isSlowRequest()) {
      this.stats.slowRequests++;
      
      // Keep track of slowest requests
      this.stats.slowestRequests.push({
        duration: entry.parsed.duration,
        method: entry.parsed.method,
        path: entry.parsed.path,
        timestamp: entry.parsed.timestamp,
        line: entry.lineNumber
      });
      
      // Keep only top 20 slowest
      this.stats.slowestRequests.sort((a, b) => b.duration - a.duration);
      if (this.stats.slowestRequests.length > 20) {
        this.stats.slowestRequests = this.stats.slowestRequests.slice(0, 20);
      }
    }
    
    // Track hourly statistics
    if (entry.parsed.timestamp) {
      const hour = new Date(entry.parsed.timestamp).getHours();
      if (!this.stats.hourlyStats[hour]) {
        this.stats.hourlyStats[hour] = {
          requests: 0,
          errors: 0,
          avgDuration: 0,
          totalDuration: 0
        };
      }
      this.stats.hourlyStats[hour].requests++;
      if (entry.isError()) {
        this.stats.hourlyStats[hour].errors++;
      }
      if (entry.parsed.duration) {
        this.stats.hourlyStats[hour].totalDuration += entry.parsed.duration;
        this.stats.hourlyStats[hour].avgDuration = 
          this.stats.hourlyStats[hour].totalDuration / this.stats.hourlyStats[hour].requests;
      }
    }
  }
  
  normalizeErrorMessage(message) {
    // Remove specific values to group similar errors
    return message
      .replace(/\d+/g, 'N')
      .replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, 'UUID')
      .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, 'IP')
      .substring(0, 100);
  }
  
  generateReport() {
    const errorRate = this.stats.totalRequests > 0 ? 
      (this.stats.errors / this.stats.totalRequests) : 0;
    const warningRate = this.stats.totalRequests > 0 ? 
      (this.stats.warnings / this.stats.totalRequests) : 0;
    
    // Sort endpoints by error rate
    const errorProneEndpoints = Object.entries(this.stats.endpoints)
      .map(([endpoint, stats]) => ({
        endpoint,
        ...stats,
        errorRate: stats.count > 0 ? (stats.errors / stats.count) : 0
      }))
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 10);
    
    // Sort error messages by frequency
    const topErrors = Object.entries(this.stats.errorMessages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([message, count]) => ({ message, count }));
    
    return {
      summary: {
        totalLines: this.stats.totalLines,
        totalRequests: this.stats.totalRequests,
        errors: this.stats.errors,
        warnings: this.stats.warnings,
        slowRequests: this.stats.slowRequests,
        errorRate: (errorRate * 100).toFixed(2) + '%',
        warningRate: (warningRate * 100).toFixed(2) + '%',
        healthStatus: errorRate > config.thresholds.errorRate ? 'unhealthy' :
                     warningRate > config.thresholds.warningRate ? 'degraded' : 'healthy'
      },
      statusCodeDistribution: this.stats.statusCodes,
      topErrors,
      errorProneEndpoints,
      slowestRequests: this.stats.slowestRequests.slice(0, 10),
      recentErrors: this.stats.recentErrors.slice(-10),
      hourlyDistribution: this.stats.hourlyStats,
      recommendations: this.generateRecommendations(errorRate, warningRate)
    };
  }
  
  generateRecommendations(errorRate, warningRate) {
    const recommendations = [];
    
    if (errorRate > config.thresholds.errorRate) {
      recommendations.push({
        severity: 'critical',
        message: `Error rate (${(errorRate * 100).toFixed(2)}%) exceeds threshold (${config.thresholds.errorRate * 100}%)`,
        action: 'Investigate and fix the top error messages immediately'
      });
    }
    
    if (this.stats.slowRequests > this.stats.totalRequests * 0.1) {
      recommendations.push({
        severity: 'high',
        message: `More than 10% of requests are slow (>${config.thresholds.slowRequestMs}ms)`,
        action: 'Optimize slow endpoints or increase resources'
      });
    }
    
    // Check for specific error patterns
    const errorPatterns = Object.keys(this.stats.errorMessages);
    if (errorPatterns.some(msg => msg.includes('memory'))) {
      recommendations.push({
        severity: 'high',
        message: 'Memory-related errors detected',
        action: 'Check memory usage and consider increasing memory limits'
      });
    }
    
    if (errorPatterns.some(msg => msg.includes('timeout'))) {
      recommendations.push({
        severity: 'medium',
        message: 'Timeout errors detected',
        action: 'Review timeout settings and optimize slow operations'
      });
    }
    
    // Check status code distribution
    const serverErrors = Object.entries(this.stats.statusCodes)
      .filter(([code]) => code >= 500)
      .reduce((sum, [, count]) => sum + count, 0);
    
    if (serverErrors > this.stats.totalRequests * 0.01) {
      recommendations.push({
        severity: 'high',
        message: 'High rate of 5xx server errors',
        action: 'Check server health and error logs'
      });
    }
    
    return recommendations;
  }
}

// Main execution
async function main() {
  console.log('Starting log analysis...\n');
  logger.info('Log analyzer started');
  
  try {
    // Get log files
    const files = await fs.readdir(config.logDir);
    const logFiles = files.filter(f => f.endsWith('.log'));
    
    if (logFiles.length === 0) {
      console.log('No log files found in', config.logDir);
      return;
    }
    
    console.log(`Found ${logFiles.length} log files\n`);
    
    // Analyze each file
    const analyzer = new LogAnalyzer();
    
    for (const file of logFiles) {
      console.log(`Analyzing ${file}...`);
      const filePath = path.join(config.logDir, file);
      await analyzer.analyzeFile(filePath);
    }
    
    // Generate report
    const report = analyzer.generateReport();
    
    // Output report
    console.log('\n=== LOG ANALYSIS REPORT ===\n');
    
    console.log('SUMMARY:');
    console.log(JSON.stringify(report.summary, null, 2));
    
    console.log('\nSTATUS CODE DISTRIBUTION:');
    console.log(JSON.stringify(report.statusCodeDistribution, null, 2));
    
    console.log('\nTOP ERRORS:');
    report.topErrors.forEach((err, i) => {
      console.log(`${i + 1}. ${err.message} (${err.count} occurrences)`);
    });
    
    console.log('\nERROR-PRONE ENDPOINTS:');
    report.errorProneEndpoints.forEach((ep, i) => {
      console.log(`${i + 1}. ${ep.endpoint} - ${ep.errorRate * 100}% error rate (${ep.errors}/${ep.count})`);
    });
    
    console.log('\nSLOWEST REQUESTS:');
    report.slowestRequests.forEach((req, i) => {
      console.log(`${i + 1}. ${req.method} ${req.path} - ${req.duration}ms`);
    });
    
    console.log('\nRECOMMENDATIONS:');
    report.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. [${rec.severity.toUpperCase()}] ${rec.message}`);
      console.log(`   Action: ${rec.action}`);
    });
    
    // Save detailed report
    const reportPath = path.join(config.logDir, `analysis-${Date.now()}.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nDetailed report saved to: ${reportPath}`);
    
    logger.info('Log analysis completed', report.summary);
    
  } catch (err) {
    console.error('Error during log analysis:', err);
    logger.error('Log analysis failed', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  LogEntry,
  LogAnalyzer,
  config
};