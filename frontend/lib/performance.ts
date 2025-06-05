// Performance monitoring utilities for Business of One

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

// Thresholds based on Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  TTI: { good: 3800, poor: 7300 }, // Time to Interactive
};

// Get rating based on metric value
function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Send metrics to analytics endpoint
export function sendToAnalytics(metric: PerformanceMetric) {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to your analytics endpoint
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    }).catch(console.error);
  } else {
    // In development, log to console
    console.log('Performance Metric:', metric);
  }
}

// Initialize Web Vitals monitoring
export function initWebVitals() {
  if (typeof window === 'undefined') return;
  
  // Dynamically import web-vitals to avoid blocking
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS((metric: any) => {
      sendToAnalytics({
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value),
        timestamp: Date.now(),
      });
    });
    
    onFID((metric: any) => {
      sendToAnalytics({
        name: 'FID',
        value: metric.value,
        rating: getRating('FID', metric.value),
        timestamp: Date.now(),
      });
    });
    
    onFCP((metric: any) => {
      sendToAnalytics({
        name: 'FCP',
        value: metric.value,
        rating: getRating('FCP', metric.value),
        timestamp: Date.now(),
      });
    });
    
    onLCP((metric: any) => {
      sendToAnalytics({
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value),
        timestamp: Date.now(),
      });
    });
    
    onTTFB((metric: any) => {
      sendToAnalytics({
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value),
        timestamp: Date.now(),
      });
    });
  });
}

// Custom performance marks
export function markPerformance(markName: string) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(markName);
  }
}

// Measure between two marks
export function measurePerformance(measureName: string, startMark: string, endMark: string) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    try {
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName)[0];
      
      if (measure) {
        sendToAnalytics({
          name: measureName,
          value: measure.duration,
          rating: 'good', // Custom metrics default to good
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error('Performance measurement error:', error);
    }
  }
}

// Resource timing analysis
export function analyzeResources() {
  if (typeof window === 'undefined' || !('performance' in window)) return;
  
  const resources = performance.getEntriesByType('resource');
  const summary = {
    totalResources: resources.length,
    totalSize: 0,
    byType: {} as Record<string, { count: number; size: number; duration: number }>,
  };
  
  resources.forEach((resource: any) => {
    const type = resource.initiatorType || 'other';
    if (!summary.byType[type]) {
      summary.byType[type] = { count: 0, size: 0, duration: 0 };
    }
    
    summary.byType[type].count++;
    summary.byType[type].duration += resource.duration;
    
    // Estimate size from transfer size if available
    if (resource.transferSize) {
      summary.totalSize += resource.transferSize;
      summary.byType[type].size += resource.transferSize;
    }
  });
  
  return summary;
}

// Performance observer for long tasks
export function observeLongTasks(callback?: (duration: number) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
  
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Long task threshold is 50ms
        if (entry.duration > 50) {
          sendToAnalytics({
            name: 'LongTask',
            value: entry.duration,
            rating: entry.duration > 100 ? 'poor' : 'needs-improvement',
            timestamp: Date.now(),
          });
          
          if (callback) {
            callback(entry.duration);
          }
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
    return observer;
  } catch (error) {
    console.error('Failed to observe long tasks:', error);
  }
}

// Check if user has slow connection
export function isSlowConnection(): boolean {
  if (typeof window === 'undefined' || !('navigator' in window)) return false;
  
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (connection) {
    // Check effective type
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      return true;
    }
    
    // Check save data mode
    if (connection.saveData) {
      return true;
    }
    
    // Check downlink speed (in Mbps)
    if (connection.downlink && connection.downlink < 1.5) {
      return true;
    }
  }
  
  return false;
}

// Prefetch critical resources
export function prefetchCriticalResources(urls: string[]) {
  if (typeof window === 'undefined' || isSlowConnection()) return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = url.endsWith('.js') ? 'script' : 
              url.endsWith('.css') ? 'style' : 
              url.match(/\.(jpg|jpeg|png|webp|avif)$/i) ? 'image' : 'fetch';
    document.head.appendChild(link);
  });
}