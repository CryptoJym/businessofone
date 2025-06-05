'use client';

import { useEffect } from 'react';
import { initWebVitals, observeLongTasks, markPerformance } from '@/lib/performance';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals();
    
    // Mark when the app becomes interactive
    markPerformance('app-interactive');
    
    // Observe long tasks
    const observer = observeLongTasks((duration) => {
      console.warn(`Long task detected: ${duration}ms`);
    });
    
    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
  
  return <>{children}</>;
}