import { useEffect, useRef, useCallback, useState } from 'react';
import { useAccessibility } from '@/src/contexts/AccessibilityContext';
import { FocusTrap } from '@/src/types/accessibility';

// Hook for managing focus trap
export function useFocusTrap(options?: Partial<FocusTrap>) {
  const containerRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus initial element
    if (options?.initialFocus) {
      options.initialFocus.focus();
    } else if (firstFocusable) {
      firstFocusable.focus();
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (!options?.allowOutsideClick && container && !container.contains(e.target as Node)) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      
      if (options?.returnFocus && document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
    };
  }, [isActive, options]);
  
  return {
    containerRef,
    activate: () => setIsActive(true),
    deactivate: () => setIsActive(false),
  };
}

// Hook for skip links
export function useSkipLinks() {
  const [skipLinks, setSkipLinks] = useState<{ id: string; label: string; target: string }[]>([]);
  
  useEffect(() => {
    // Find all main landmark regions
    const landmarks = {
      main: document.querySelector('main'),
      nav: document.querySelector('nav'),
      search: document.querySelector('[role="search"]'),
      footer: document.querySelector('footer'),
    };
    
    const links = [];
    
    if (landmarks.main) {
      links.push({ id: 'skip-to-main', label: 'Skip to main content', target: '#main' });
    }
    
    if (landmarks.nav) {
      links.push({ id: 'skip-to-nav', label: 'Skip to navigation', target: '#navigation' });
    }
    
    if (landmarks.search) {
      links.push({ id: 'skip-to-search', label: 'Skip to search', target: '#search' });
    }
    
    setSkipLinks(links);
  }, []);
  
  return skipLinks;
}

// Hook for announcing changes to screen readers
export function useAnnounce() {
  const { announce } = useAccessibility();
  
  return {
    announce,
    announcePolite: (message: string) => announce(message, 'polite'),
    announceAssertive: (message: string) => announce(message, 'assertive'),
  };
}

// Hook for keyboard navigation
export function useKeyboardNavigation(items: HTMLElement[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { preferences } = useAccessibility();
  
  useEffect(() => {
    if (!preferences.keyboardNavigationEnabled || items.length === 0) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex(prev => (prev + 1) % items.length);
          break;
          
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
          break;
          
        case 'Home':
          e.preventDefault();
          setCurrentIndex(0);
          break;
          
        case 'End':
          e.preventDefault();
          setCurrentIndex(items.length - 1);
          break;
          
        case 'Enter':
        case ' ':
          e.preventDefault();
          items[currentIndex]?.click();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, currentIndex, preferences.keyboardNavigationEnabled]);
  
  useEffect(() => {
    items[currentIndex]?.focus();
  }, [currentIndex, items]);
  
  return {
    currentIndex,
    setCurrentIndex,
    focusCurrent: () => items[currentIndex]?.focus(),
    focusFirst: () => setCurrentIndex(0),
    focusLast: () => setCurrentIndex(items.length - 1),
  };
}

// Hook for managing ARIA live regions
export function useLiveRegion(initialMessage = '') {
  const [message, setMessage] = useState(initialMessage);
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite');
  
  const update = useCallback((newMessage: string, newPoliteness: 'polite' | 'assertive' = 'polite') => {
    setMessage(newMessage);
    setPoliteness(newPoliteness);
  }, []);
  
  return {
    message,
    politeness,
    update,
    clear: () => setMessage(''),
  };
}

// Hook for heading hierarchy validation
export function useHeadingHierarchy() {
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const issues: string[] = [];
    let lastLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      
      // Check for multiple h1s
      if (level === 1 && headings.filter(h => h.tagName === 'H1').length > 1) {
        issues.push('Multiple h1 elements found. There should only be one h1 per page.');
      }
      
      // Check for skipped levels
      if (lastLevel && level > lastLevel + 1) {
        issues.push(`Heading level skipped: h${lastLevel} followed by h${level} at position ${index + 1}`);
      }
      
      lastLevel = level;
    });
    
    setIsValid(issues.length === 0);
    setErrors(issues);
  }, []);
  
  return { isValid, errors };
}

// Hook for color contrast validation
export function useColorContrast(foreground: string, background: string) {
  const [ratio, setRatio] = useState<number>(1);
  const [meetsAA, setMeetsAA] = useState(false);
  const [meetsAAA, setMeetsAAA] = useState(false);
  
  useEffect(() => {
    // This would use a proper color contrast calculation algorithm
    // For now, using placeholder values
    const calculatedRatio = 4.5; // Placeholder
    setRatio(calculatedRatio);
    setMeetsAA(calculatedRatio >= 4.5);
    setMeetsAAA(calculatedRatio >= 7);
  }, [foreground, background]);
  
  return { ratio, meetsAA, meetsAAA };
}

// Hook for managing roving tabindex
export function useRovingTabindex(items: HTMLElement[]) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  useEffect(() => {
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === focusedIndex ? '0' : '-1');
    });
  }, [items, focusedIndex]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { key } = e;
    const itemCount = items.length;
    
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % itemCount);
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + itemCount) % itemCount);
    } else if (key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
    } else if (key === 'End') {
      e.preventDefault();
      setFocusedIndex(itemCount - 1);
    }
  }, [items.length]);
  
  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
}