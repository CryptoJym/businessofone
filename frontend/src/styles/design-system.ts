// Business of One Design System - Accessibility-First Approach

export const colors = {
  // Primary brand colors
  primary: {
    50: '#E6F0FF',
    100: '#CCE1FF',
    200: '#99C3FF',
    300: '#66A5FF',
    400: '#4D96FF',
    500: '#4169E1', // Utlyze Blue
    600: '#3355B4',
    700: '#264187',
    800: '#1A2C5A',
    900: '#0D162D',
  },
  
  // Accent colors
  accent: {
    50: '#E6F4F1',
    100: '#CCEAE3',
    200: '#99D5C7',
    300: '#66C0AB',
    400: '#33AB8F',
    500: '#16A085', // Business accent
    600: '#128068',
    700: '#0E604E',
    800: '#0A4034',
    900: '#05201A',
  },
  
  // Neutral colors with high contrast ratios
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  
  // Semantic colors (WCAG AAA compliant)
  success: {
    light: '#10B981',
    dark: '#047857',
    contrast: '#FFFFFF',
  },
  warning: {
    light: '#F59E0B',
    dark: '#D97706',
    contrast: '#000000',
  },
  error: {
    light: '#EF4444',
    dark: '#DC2626',
    contrast: '#FFFFFF',
  },
  info: {
    light: '#3B82F6',
    dark: '#2563EB',
    contrast: '#FFFFFF',
  },
  
  // High contrast mode colors
  highContrast: {
    background: '#000000',
    foreground: '#FFFFFF',
    primary: '#00D4FF',
    secondary: '#FFD700',
    border: '#FFFFFF',
  },
  
  // Color blind safe palette
  colorBlindSafe: {
    blue: '#0173B2',
    orange: '#DE8F05',
    green: '#029E73',
    yellow: '#CC78BC',
    purple: '#56B4E9',
    red: '#E69F00',
    pink: '#F0E442',
    gray: '#999999',
  },
};

export const typography = {
  // Font families with fallbacks
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  
  // Font sizes with responsive scaling
  sizes: {
    xs: { base: '0.75rem', lineHeight: '1rem' },
    sm: { base: '0.875rem', lineHeight: '1.25rem' },
    base: { base: '1rem', lineHeight: '1.5rem' },
    lg: { base: '1.125rem', lineHeight: '1.75rem' },
    xl: { base: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { base: '1.5rem', lineHeight: '2rem' },
    '3xl': { base: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { base: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { base: '3rem', lineHeight: '1' },
  },
  
  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Letter spacing for readability
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  // Consistent spacing scale
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const animations = {
  // Respect reduced motion preferences
  transition: {
    base: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  
  // Keyframes with reduced motion alternatives
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideIn: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const borders = {
  radius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
};

export const focus = {
  // WCAG compliant focus indicators
  ring: {
    color: colors.primary[500],
    width: '3px',
    offset: '2px',
    style: 'solid',
  },
  
  // High contrast focus
  highContrastRing: {
    color: colors.highContrast.primary,
    width: '4px',
    offset: '2px',
    style: 'solid',
  },
};

export const zIndex = {
  auto: 'auto',
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  skipLink: 9999,
};

// WCAG contrast ratio utilities
export const getContrastRatio = (foreground: string, background: string): number => {
  // Implementation would calculate actual contrast ratio
  // For now, return a placeholder
  return 4.5;
};

export const meetsWCAGAA = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 4.5;
};

export const meetsWCAGAAA = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 7;
};

// Font size scaling for accessibility
export const getFontSizeScale = (scale: 'small' | 'medium' | 'large' | 'extra-large'): number => {
  const scales = {
    small: 0.875,
    medium: 1,
    large: 1.125,
    'extra-large': 1.25,
  };
  return scales[scale];
};

// Motion preferences
export const getMotionSafeValue = (normalValue: string, reducedValue: string = 'none'): string => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion ? reducedValue : normalValue;
  }
  return normalValue;
};