# Business of One - Accessibility Features Documentation

## Overview

Business of One is built with accessibility as a core principle, ensuring that all users, regardless of their abilities, can effectively use and navigate the platform. This document outlines all accessibility features implemented in the application.

## Table of Contents

1. [Core Features](#core-features)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Screen Reader Support](#screen-reader-support)
4. [Visual Accessibility](#visual-accessibility)
5. [Motion and Animation](#motion-and-animation)
6. [Form Accessibility](#form-accessibility)
7. [Testing and Validation](#testing-and-validation)
8. [Developer Guide](#developer-guide)

## Core Features

### Accessibility Context

The application uses a central `AccessibilityContext` that manages user preferences:

```typescript
const { preferences, updatePreference } = useAccessibility();
```

### User Preferences

Users can customize:
- **Color Scheme**: Light, Dark, High Contrast
- **Font Size**: Small, Medium, Large, Extra Large
- **Motion**: Normal, Reduced
- **Color Blind Mode**: Protanopia, Deuteranopia, Tritanopia, Monochromacy
- **Enhanced Features**: Keyboard navigation, screen reader optimization, focus indicators

## Keyboard Navigation

### Skip Links

Skip links are automatically generated for major page sections:
- Skip to main content
- Skip to navigation
- Skip to search

### Keyboard Shortcuts

Register custom keyboard shortcuts:

```typescript
const { registerShortcut } = useAccessibility();

registerShortcut({
  key: 's',
  ctrl: true,
  description: 'Save document',
  action: () => saveDocument()
});
```

### Focus Management

- **Focus Trap**: Use `useFocusTrap` hook for modals and dialogs
- **Focus Indicators**: Enhanced 3px outline with proper contrast
- **Roving Tabindex**: For complex widgets like menus

## Screen Reader Support

### ARIA Implementation

- Semantic HTML5 landmarks
- Proper heading hierarchy
- ARIA labels and descriptions
- Live regions for dynamic content

### Announcements

Use the announcement system for dynamic updates:

```typescript
const { announce } = useAnnounce();

// Polite announcement
announce('Form saved successfully', 'polite');

// Assertive announcement for urgent messages
announce('Error: Please fix validation errors', 'assertive');
```

## Visual Accessibility

### Color Contrast

All color combinations meet WCAG AAA standards:
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

### Color Schemes

#### Light Mode (Default)
- Primary: #4169E1 (Utlyze Blue)
- Background: #FFFFFF
- Text: #171717

#### Dark Mode
- Automatically detected from system preferences
- Optimized for reduced eye strain
- Maintains proper contrast ratios

#### High Contrast Mode
- Pure black background (#000000)
- Pure white text (#FFFFFF)
- Bright accent colors for links and buttons

### Color Blind Modes

Support for all major types of color blindness:
- **Protanopia**: Red-blind
- **Deuteranopia**: Green-blind
- **Tritanopia**: Blue-blind
- **Monochromacy**: Complete color blindness

## Motion and Animation

### Reduced Motion

Respects `prefers-reduced-motion` system preference:
- Disables all animations
- Removes parallax effects
- Instant transitions

### Animation Controls

```css
[data-motion="reduced"] * {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

## Form Accessibility

### Best Practices

1. **Labels**: All form fields have associated labels
2. **Required Fields**: Marked with `aria-required="true"`
3. **Error Messages**: Connected via `aria-describedby`
4. **Field Descriptions**: Help text linked to fields

### Example Implementation

```tsx
<div>
  <label htmlFor="email">
    Email <span aria-label="required">*</span>
  </label>
  <input
    type="email"
    id="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby="email-error email-help"
  />
  <p id="email-help">We'll never share your email</p>
  {hasError && (
    <p id="email-error" role="alert">
      Please enter a valid email address
    </p>
  )}
</div>
```

## Testing and Validation

### Automated Testing

Use the built-in validation hooks:

```typescript
// Check heading hierarchy
const { isValid, errors } = useHeadingHierarchy();

// Validate color contrast
const { meetsAA, meetsAAA } = useColorContrast('#4169E1', '#FFFFFF');
```

### Manual Testing Checklist

- [ ] Keyboard-only navigation
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] 200% zoom without horizontal scrolling
- [ ] Color contrast validation
- [ ] Focus indicator visibility
- [ ] Form field associations
- [ ] Error message clarity

## Developer Guide

### Using Accessible Components

#### Button Component

```tsx
import { Button } from '@/components/ui/Button';

<Button
  variant="primary"
  onClick={handleClick}
  aria-label="Save document and close dialog"
>
  Save
</Button>
```

#### Skip Links

Automatically included via `<SkipLinks />` component.

#### Accessibility Panel

Include in your app root:

```tsx
<AccessibilityProvider>
  <SkipLinks />
  <YourApp />
  <AccessibilityPanel />
</AccessibilityProvider>
```

### Utility Functions

```typescript
import {
  generateId,
  isFocusable,
  getFocusableElements,
  trapFocus,
  announce,
  formatTimeForScreenReader,
  getAccessibleName
} from '@/utils/a11y';
```

### CSS Classes

- `.sr-only`: Hide visually but keep for screen readers
- `.sr-only-focusable`: Show when focused
- `.skip-link`: Styled skip navigation links

## WCAG 2.1 Compliance

This application targets WCAG 2.1 Level AAA compliance:

### Perceivable
- ✅ Text alternatives for non-text content
- ✅ Captions and transcripts
- ✅ Sufficient color contrast
- ✅ Resizable text up to 200%

### Operable
- ✅ Keyboard accessible
- ✅ No keyboard traps
- ✅ Skip navigation links
- ✅ Clear focus indicators

### Understandable
- ✅ Clear language
- ✅ Consistent navigation
- ✅ Input assistance
- ✅ Error identification

### Robust
- ✅ Valid HTML
- ✅ ARIA landmarks
- ✅ Name, role, value for all UI components
- ✅ Status messages

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

## Contributing

When adding new features, ensure:
1. All interactive elements are keyboard accessible
2. Proper ARIA labels are included
3. Color contrast requirements are met
4. Motion can be reduced
5. Screen reader testing is performed

For questions or suggestions, please open an issue in the repository.