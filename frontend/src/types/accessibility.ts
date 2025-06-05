// Accessibility Types for Business of One

export type ColorScheme = 'light' | 'dark' | 'high-contrast';
export type MotionPreference = 'reduced' | 'normal';
export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy';

export interface A11yPreferences {
  colorScheme: ColorScheme;
  motionPreference: MotionPreference;
  fontSize: FontSize;
  colorBlindMode: ColorBlindMode;
  keyboardNavigationEnabled: boolean;
  screenReaderOptimized: boolean;
  focusIndicatorEnabled: boolean;
  captions: boolean;
  transcripts: boolean;
  audioDescriptions: boolean;
}

export interface A11yAnnouncement {
  message: string;
  priority: 'polite' | 'assertive';
  id?: string;
}

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  description: string;
  action: () => void;
}

export interface FocusTrap {
  container: HTMLElement;
  initialFocus?: HTMLElement;
  returnFocus?: boolean;
  allowOutsideClick?: boolean;
}

export interface SkipLink {
  id: string;
  label: string;
  target: string;
}

export interface A11yValidationError {
  element?: HTMLElement;
  issue: string;
  severity: 'error' | 'warning';
  wcagCriteria?: string;
  suggestion?: string;
}

export interface LiveRegion {
  id: string;
  politeness: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

export interface HeadingStructure {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id?: string;
}

export interface FormFieldA11y {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  ariaDescribedBy?: string[];
}