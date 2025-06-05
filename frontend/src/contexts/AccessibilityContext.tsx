'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { A11yPreferences, A11yAnnouncement, KeyboardShortcut } from '@/src/types/accessibility';

interface AccessibilityContextType {
  preferences: A11yPreferences;
  updatePreference: <K extends keyof A11yPreferences>(key: K, value: A11yPreferences[K]) => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  announcements: A11yAnnouncement[];
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (key: string) => void;
  shortcuts: KeyboardShortcut[];
}

const defaultPreferences: A11yPreferences = {
  colorScheme: 'light',
  motionPreference: 'normal',
  fontSize: 'medium',
  colorBlindMode: 'none',
  keyboardNavigationEnabled: true,
  screenReaderOptimized: false,
  focusIndicatorEnabled: true,
  captions: false,
  transcripts: false,
  audioDescriptions: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<A11yPreferences>(defaultPreferences);
  const [announcements, setAnnouncements] = useState<A11yAnnouncement[]>([]);
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('a11y-preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to load accessibility preferences:', error);
      }
    }

    // Detect system preferences
    if (window.matchMedia) {
      // Color scheme
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkModeQuery.matches && !savedPreferences) {
        updatePreference('colorScheme', 'dark');
      }

      // Motion preference
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (reducedMotionQuery.matches && !savedPreferences) {
        updatePreference('motionPreference', 'reduced');
      }

      // High contrast
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      if (highContrastQuery.matches && !savedPreferences) {
        updatePreference('colorScheme', 'high-contrast');
      }
    }
  }, []);

  // Save preferences to localStorage
  const updatePreference = useCallback(<K extends keyof A11yPreferences>(
    key: K,
    value: A11yPreferences[K]
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('a11y-preferences', JSON.stringify(updated));
      
      // Apply preferences to document
      applyPreferences(updated);
      
      return updated;
    });
  }, []);

  // Apply preferences to document
  const applyPreferences = (prefs: A11yPreferences) => {
    const root = document.documentElement;
    
    // Color scheme
    root.setAttribute('data-color-scheme', prefs.colorScheme);
    
    // Font size
    root.setAttribute('data-font-size', prefs.fontSize);
    
    // Motion preference
    root.setAttribute('data-motion', prefs.motionPreference);
    
    // Color blind mode
    root.setAttribute('data-color-blind-mode', prefs.colorBlindMode);
    
    // Focus indicator
    root.setAttribute('data-focus-indicator', prefs.focusIndicatorEnabled ? 'true' : 'false');
    
    // Screen reader optimization
    root.setAttribute('data-screen-reader', prefs.screenReaderOptimized ? 'true' : 'false');
  };

  // Announce to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement: A11yAnnouncement = {
      message,
      priority,
      id: Date.now().toString(),
    };
    
    setAnnouncements(prev => [...prev, announcement]);
    
    // Remove announcement after 1 second
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 1000);
  }, []);

  // Register keyboard shortcut
  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts(prev => [...prev.filter(s => s.key !== shortcut.key), shortcut]);
  }, []);

  // Unregister keyboard shortcut
  const unregisterShortcut = useCallback((key: string) => {
    setShortcuts(prev => prev.filter(s => s.key !== key));
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!preferences.keyboardNavigationEnabled) return;
      
      shortcuts.forEach(shortcut => {
        const isMatch = 
          e.key === shortcut.key &&
          (shortcut.ctrl === undefined || e.ctrlKey === shortcut.ctrl) &&
          (shortcut.alt === undefined || e.altKey === shortcut.alt) &&
          (shortcut.shift === undefined || e.shiftKey === shortcut.shift) &&
          (shortcut.meta === undefined || e.metaKey === shortcut.meta);
        
        if (isMatch) {
          e.preventDefault();
          shortcut.action();
          announce(`Activated: ${shortcut.description}`);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, preferences.keyboardNavigationEnabled, announce]);

  // Apply initial preferences
  useEffect(() => {
    applyPreferences(preferences);
  }, [preferences]);

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        updatePreference,
        announce,
        announcements,
        registerShortcut,
        unregisterShortcut,
        shortcuts,
      }}
    >
      {children}
      {/* Live regions for announcements */}
      <div
        role="region"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements
          .filter(a => a.priority === 'polite')
          .map(a => <div key={a.id}>{a.message}</div>)}
      </div>
      <div
        role="region"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements
          .filter(a => a.priority === 'assertive')
          .map(a => <div key={a.id}>{a.message}</div>)}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}