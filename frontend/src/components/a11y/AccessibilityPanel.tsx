'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/src/contexts/AccessibilityContext';
import { ColorScheme, MotionPreference, FontSize, ColorBlindMode } from '@/src/types/accessibility';
import { colors, spacing, borders, typography } from '@/src/styles/design-system';

export function AccessibilityPanel() {
  const { preferences, updatePreference } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        className="a11y-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 0 0 20" />
          <circle cx="12" cy="8" r="2" />
          <path d="M12 14v4" />
        </svg>
        <span className="sr-only">Accessibility settings</span>
      </button>
      
      {isOpen && (
        <div
          id="a11y-panel"
          className="a11y-panel"
          role="dialog"
          aria-labelledby="a11y-panel-title"
          aria-modal="true"
        >
          <div className="panel-header">
            <h2 id="a11y-panel-title">Accessibility Settings</h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility settings"
              className="close-button"
            >
              ×
            </button>
          </div>
          
          <div className="panel-content">
            {/* Color Scheme */}
            <fieldset>
              <legend>Color Scheme</legend>
              <div className="radio-group">
                {(['light', 'dark', 'high-contrast'] as ColorScheme[]).map(scheme => (
                  <label key={scheme} className="radio-label">
                    <input
                      type="radio"
                      name="colorScheme"
                      value={scheme}
                      checked={preferences.colorScheme === scheme}
                      onChange={() => updatePreference('colorScheme', scheme)}
                    />
                    <span>{scheme.charAt(0).toUpperCase() + scheme.slice(1).replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            
            {/* Font Size */}
            <fieldset>
              <legend>Font Size</legend>
              <div className="radio-group">
                {(['small', 'medium', 'large', 'extra-large'] as FontSize[]).map(size => (
                  <label key={size} className="radio-label">
                    <input
                      type="radio"
                      name="fontSize"
                      value={size}
                      checked={preferences.fontSize === size}
                      onChange={() => updatePreference('fontSize', size)}
                    />
                    <span>{size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            
            {/* Motion Preference */}
            <fieldset>
              <legend>Motion</legend>
              <div className="radio-group">
                {(['normal', 'reduced'] as MotionPreference[]).map(motion => (
                  <label key={motion} className="radio-label">
                    <input
                      type="radio"
                      name="motionPreference"
                      value={motion}
                      checked={preferences.motionPreference === motion}
                      onChange={() => updatePreference('motionPreference', motion)}
                    />
                    <span>{motion.charAt(0).toUpperCase() + motion.slice(1)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            
            {/* Color Blind Mode */}
            <fieldset>
              <legend>Color Blind Mode</legend>
              <div className="radio-group">
                {(['none', 'protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'] as ColorBlindMode[]).map(mode => (
                  <label key={mode} className="radio-label">
                    <input
                      type="radio"
                      name="colorBlindMode"
                      value={mode}
                      checked={preferences.colorBlindMode === mode}
                      onChange={() => updatePreference('colorBlindMode', mode)}
                    />
                    <span>{mode === 'none' ? 'None' : mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            
            {/* Toggle Options */}
            <fieldset>
              <legend>Features</legend>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.keyboardNavigationEnabled}
                    onChange={(e) => updatePreference('keyboardNavigationEnabled', e.target.checked)}
                  />
                  <span>Enhanced Keyboard Navigation</span>
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.screenReaderOptimized}
                    onChange={(e) => updatePreference('screenReaderOptimized', e.target.checked)}
                  />
                  <span>Screen Reader Optimization</span>
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.focusIndicatorEnabled}
                    onChange={(e) => updatePreference('focusIndicatorEnabled', e.target.checked)}
                  />
                  <span>Enhanced Focus Indicators</span>
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.captions}
                    onChange={(e) => updatePreference('captions', e.target.checked)}
                  />
                  <span>Captions for Videos</span>
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.transcripts}
                    onChange={(e) => updatePreference('transcripts', e.target.checked)}
                  />
                  <span>Transcripts for Audio</span>
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.audioDescriptions}
                    onChange={(e) => updatePreference('audioDescriptions', e.target.checked)}
                  />
                  <span>Audio Descriptions</span>
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .a11y-toggle {
          position: fixed;
          bottom: ${spacing[4]};
          right: ${spacing[4]};
          width: 56px;
          height: 56px;
          border-radius: ${borders.radius.full};
          background: ${colors.primary[500]};
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease;
          z-index: 1000;
        }
        
        .a11y-toggle:hover {
          transform: scale(1.05);
        }
        
        .a11y-toggle:focus {
          outline: 3px solid ${colors.primary[700]};
          outline-offset: 2px;
        }
        
        .a11y-panel {
          position: fixed;
          bottom: ${spacing[20]};
          right: ${spacing[4]};
          width: 400px;
          max-width: calc(100vw - ${spacing[8]});
          max-height: 70vh;
          background: white;
          border-radius: ${borders.radius.lg};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          z-index: 1001;
        }
        
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${spacing[4]};
          border-bottom: 1px solid ${colors.neutral[200]};
        }
        
        #a11y-panel-title {
          margin: 0;
          font-size: ${typography.sizes.xl.base};
          color: ${colors.neutral[900]};
        }
        
        .close-button {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          font-size: 24px;
          cursor: pointer;
          border-radius: ${borders.radius.base};
          color: ${colors.neutral[600]};
        }
        
        .close-button:hover {
          background: ${colors.neutral[100]};
        }
        
        .close-button:focus {
          outline: 2px solid ${colors.primary[500]};
          outline-offset: -2px;
        }
        
        .panel-content {
          padding: ${spacing[4]};
          overflow-y: auto;
          max-height: calc(70vh - 80px);
        }
        
        fieldset {
          margin-bottom: ${spacing[6]};
          padding: 0;
          border: none;
        }
        
        legend {
          font-weight: ${typography.weights.semibold};
          margin-bottom: ${spacing[2]};
          color: ${colors.neutral[700]};
        }
        
        .radio-group,
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: ${spacing[2]};
        }
        
        .radio-label,
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: ${spacing[2]};
          cursor: pointer;
          padding: ${spacing[2]};
          border-radius: ${borders.radius.base};
          transition: background-color 0.2s ease;
        }
        
        .radio-label:hover,
        .checkbox-label:hover {
          background: ${colors.neutral[50]};
        }
        
        input[type="radio"],
        input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        
        input[type="radio"]:focus,
        input[type="checkbox"]:focus {
          outline: 2px solid ${colors.primary[500]};
          outline-offset: 2px;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        /* Dark mode styles */
        [data-color-scheme="dark"] .a11y-panel {
          background: ${colors.neutral[900]};
          color: ${colors.neutral[100]};
        }
        
        [data-color-scheme="dark"] .panel-header {
          border-bottom-color: ${colors.neutral[700]};
        }
        
        [data-color-scheme="dark"] #a11y-panel-title {
          color: ${colors.neutral[100]};
        }
        
        [data-color-scheme="dark"] .close-button {
          color: ${colors.neutral[400]};
        }
        
        [data-color-scheme="dark"] .close-button:hover {
          background: ${colors.neutral[800]};
        }
        
        [data-color-scheme="dark"] legend {
          color: ${colors.neutral[300]};
        }
        
        [data-color-scheme="dark"] .radio-label:hover,
        [data-color-scheme="dark"] .checkbox-label:hover {
          background: ${colors.neutral[800]};
        }
        
        /* High contrast mode */
        [data-color-scheme="high-contrast"] .a11y-panel {
          background: ${colors.highContrast.background};
          color: ${colors.highContrast.foreground};
          border: 2px solid ${colors.highContrast.border};
        }
        
        [data-color-scheme="high-contrast"] .a11y-toggle {
          background: ${colors.highContrast.primary};
          color: ${colors.highContrast.background};
          border: 2px solid ${colors.highContrast.border};
        }
      `}</style>
    </>
  );
}