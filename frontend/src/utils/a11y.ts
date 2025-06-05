// Accessibility Utility Functions

/**
 * Generate unique IDs for form elements
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.tabIndex >= 0) return true;
  
  const focusableTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  if (focusableTags.includes(element.tagName)) {
    return !(element as any).disabled;
  }
  
  return false;
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input[type="text"]:not([disabled])',
    'input[type="radio"]:not([disabled])',
    'input[type="checkbox"]:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Calculate relative luminance
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG AA compliance
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check WCAG AAA compliance
 */
export function meetsWCAGAAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Trap focus within a container
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
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
  
  container.addEventListener('keydown', handleKeyDown);
  firstFocusable?.focus();
  
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Announce message to screen readers
 */
export function announce(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
  clearAfter: number = 1000
): void {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';
  
  document.body.appendChild(liveRegion);
  liveRegion.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, clearAfter);
}

/**
 * Format time for screen readers
 */
export function formatTimeForScreenReader(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);
  
  return parts.join(', ');
}

/**
 * Get text alternative for an element
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;
  
  // Check aria-labelledby
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labels = ariaLabelledBy.split(' ')
      .map(id => document.getElementById(id)?.textContent)
      .filter(Boolean)
      .join(' ');
    if (labels) return labels;
  }
  
  // Check for associated label
  if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
    const label = element.labels?.[0];
    if (label) return label.textContent || '';
  }
  
  // Check alt attribute for images
  if (element instanceof HTMLImageElement) {
    return element.alt;
  }
  
  // Fall back to text content
  return element.textContent || '';
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers dark mode
 */
export function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Apply color blind filter to a color
 */
export function applyColorBlindFilter(
  color: string,
  mode: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy'
): string {
  // This is a simplified implementation
  // In a real application, you would use proper color transformation matrices
  switch (mode) {
    case 'protanopia':
      // Red-blind simulation
      return color.replace(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i, (_, r, g, b) => {
        const newR = Math.round(parseInt(g, 16) * 0.567 + parseInt(b, 16) * 0.433);
        return `#${newR.toString(16).padStart(2, '0')}${g}${b}`;
      });
    
    case 'deuteranopia':
      // Green-blind simulation
      return color.replace(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i, (_, r, g, b) => {
        const newG = Math.round(parseInt(r, 16) * 0.625 + parseInt(b, 16) * 0.375);
        return `#${r}${newG.toString(16).padStart(2, '0')}${b}`;
      });
    
    case 'tritanopia':
      // Blue-blind simulation
      return color.replace(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i, (_, r, g, b) => {
        const newB = Math.round(parseInt(r, 16) * 0.95 + parseInt(g, 16) * 0.05);
        return `#${r}${g}${newB.toString(16).padStart(2, '0')}`;
      });
    
    case 'monochromacy':
      // Total color blindness - convert to grayscale
      return color.replace(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i, (_, r, g, b) => {
        const gray = Math.round(
          parseInt(r, 16) * 0.299 +
          parseInt(g, 16) * 0.587 +
          parseInt(b, 16) * 0.114
        );
        const grayHex = gray.toString(16).padStart(2, '0');
        return `#${grayHex}${grayHex}${grayHex}`;
      });
    
    default:
      return color;
  }
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}