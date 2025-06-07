# Business of One Design System

## Overview

The Business of One Design System is a comprehensive set of design guidelines, components, and resources tailored for one-person businesses seeking growth. Our design philosophy emphasizes clarity, professionalism, and trustworthiness.

## Design Principles

### 1. **Clarity First**
- Clear visual hierarchy
- Intuitive navigation
- Readable typography
- Purposeful use of whitespace

### 2. **Professional & Trustworthy**
- Consistent design language
- Reliable interactions
- Professional color palette
- Polished details

### 3. **Efficient & Scalable**
- Modular components
- Flexible layouts
- Performance-optimized
- Mobile-first approach

### 4. **Empowering Solo Entrepreneurs**
- Simple to understand
- Easy to implement
- Growth-oriented features
- Accessible design

## Brand Colors

### Primary Color - Utlyze Blue
- **Primary 500**: `#4169E1` - Main brand color
- **Primary 600**: `#2d52d5` - Hover states
- **Primary 700**: `#2442c3` - Active states
- **Primary 100**: `#dbe6fe` - Light backgrounds

### Accent Color - Teal
- **Accent 500**: `#16A085` - Call-to-action elements
- **Accent 600**: `#0f766e` - Hover states
- **Accent 100**: `#ccfbf1` - Light accents

### Neutral Colors
- **Gray 900**: `#111827` - Primary text
- **Gray 600**: `#4b5563` - Secondary text
- **Gray 400**: `#9ca3af` - Tertiary text
- **Gray 200**: `#e5e7eb` - Borders
- **Gray 50**: `#f9fafb` - Backgrounds

### Semantic Colors
- **Success**: `#059669` - Positive actions/states
- **Warning**: `#f59e0b` - Caution/attention
- **Error**: `#ef4444` - Errors/destructive actions
- **Info**: `#3b82f6` - Informational content

## Typography

### Font Families
- **Primary**: Inter - Clean, modern sans-serif for all text
- **Monospace**: JetBrains Mono - Code and technical content

### Type Scale
```
7xl: 4.5rem (72px)   - Hero headlines
6xl: 3.75rem (60px)  - Page titles
5xl: 3rem (48px)     - Section headers
4xl: 2.25rem (36px)  - Subsection headers
3xl: 1.875rem (30px) - Large headings
2xl: 1.5rem (24px)   - Medium headings
xl: 1.25rem (20px)   - Small headings
lg: 1.125rem (18px)  - Large body text
base: 1rem (16px)    - Default body text
sm: 0.875rem (14px)  - Small text
xs: 0.75rem (12px)   - Tiny text
```

### Font Weights
- **Light**: 300 - Subtle emphasis
- **Regular**: 400 - Body text
- **Medium**: 500 - Slight emphasis
- **Semibold**: 600 - Moderate emphasis
- **Bold**: 700 - Strong emphasis
- **Extrabold**: 800 - Maximum emphasis

## Spacing System

Our spacing system uses a consistent 4px base unit:

```
0: 0
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
5: 1.25rem (20px)
6: 1.5rem (24px)
8: 2rem (32px)
10: 2.5rem (40px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
24: 6rem (96px)
```

## Components

### Button
Versatile button component with multiple variants:

```tsx
// Primary - Main actions
<Button variant="primary">Get Started</Button>

// Accent - Call-to-action
<Button variant="accent">Contact Sales</Button>

// Secondary - Secondary actions
<Button variant="secondary">Learn More</Button>

// Outline - Tertiary actions
<Button variant="outline">View Details</Button>

// Ghost - Minimal emphasis
<Button variant="ghost">Cancel</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With icons
<Button icon={<Icon />} iconPosition="left">With Icon</Button>

// Loading state
<Button loading>Processing...</Button>
```

### Card
Flexible container component:

```tsx
// Basic card
<Card>
  <CardHeader title="Revenue Growth" subtitle="Monthly overview" />
  <CardBody>
    <p>Your content here</p>
  </CardBody>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>

// Card variants
<Card variant="elevated">Elevated card with shadow</Card>
<Card variant="outlined">Outlined card</Card>
<Card variant="filled">Filled background card</Card>

// Interactive cards
<Card hoverable clickable>
  Interactive card content
</Card>
```

### Input
Comprehensive form input component:

```tsx
// Basic input
<Input 
  label="Email Address"
  placeholder="you@example.com"
  hint="We'll never share your email"
/>

// With validation
<Input 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// With icons
<Input 
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Variants
<Input variant="filled" />
<Input variant="underline" />

// Textarea
<Textarea 
  label="Description"
  rows={4}
  hint="Maximum 500 characters"
/>
```

### Badge
Status and label indicators:

```tsx
// Basic badges
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="accent">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>

// With dot indicator
<Badge dot variant="success">Online</Badge>

// Status badge helper
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="error" />
```

## Layout Patterns

### Container
Standard container with responsive padding:
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Grid System
Responsive grid utilities:
```css
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

/* Responsive */
@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

### Flexbox Utilities
Common flex patterns:
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: 1rem; }
```

## Shadows

Elevation system for depth:

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Colored shadows for emphasis */
--shadow-primary: 0 4px 14px 0 rgba(65, 105, 225, 0.3);
--shadow-accent: 0 4px 14px 0 rgba(22, 160, 133, 0.3);
```

## Border Radius

Consistent corner rounding:

```css
--radius-sm: 0.125rem (2px)
--radius-base: 0.25rem (4px)
--radius-md: 0.375rem (6px)
--radius-lg: 0.5rem (8px)
--radius-xl: 0.75rem (12px)
--radius-2xl: 1rem (16px)
--radius-full: 9999px
```

## Animations

Smooth transitions and animations:

### Transition Durations
- **Fast**: 150ms - Micro-interactions
- **Base**: 200ms - Default transitions
- **Slow**: 300ms - Larger state changes
- **Slower**: 500ms - Complex animations

### Animation Patterns
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

## Responsive Design

### Breakpoints
```css
sm: 640px   - Small devices
md: 768px   - Medium devices
lg: 1024px  - Large devices
xl: 1280px  - Extra large devices
2xl: 1536px - Ultra wide screens
```

### Mobile-First Approach
Always design for mobile first, then enhance for larger screens:

```css
/* Base styles for mobile */
.text-base { font-size: 1rem; }

/* Enhanced for larger screens */
@media (min-width: 768px) {
  .md\:text-lg { font-size: 1.125rem; }
}
```

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Primary colors tested against white backgrounds
- Interactive elements have sufficient contrast

### Focus States
- All interactive elements have visible focus indicators
- Focus rings use primary color with offset
- Keyboard navigation fully supported

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels where needed
- Descriptive button and link text

## Usage Guidelines

### When to Use Primary Color
- Main CTAs and primary actions
- Active navigation states
- Important links
- Form focus states

### When to Use Accent Color
- Secondary CTAs
- Success states
- Highlighting new features
- Growth-oriented elements

### Typography Best Practices
- Body text: 16px minimum
- Line height: 1.5-1.625 for readability
- Maximum line length: 65-75 characters
- Sufficient paragraph spacing

### Component Composition
- Start with base components
- Combine for complex interfaces
- Maintain consistent spacing
- Follow established patterns

## Implementation

### CSS Variables
The design system uses CSS custom properties for easy theming:

```css
:root {
  --color-primary-500: #4169E1;
  --color-accent-500: #16A085;
  /* ... more tokens */
}
```

### TypeScript Support
All components include full TypeScript definitions for type safety:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // ... more props
}
```

### Performance Considerations
- Components use CSS-in-JS for optimal performance
- Lazy loading for heavy components
- Minimal runtime overhead
- Tree-shakeable exports

## Future Enhancements

### Planned Components
- Modal/Dialog system
- Toast notifications
- Dropdown menus
- Data tables
- Charts and graphs
- Navigation components

### Theming System
- Dark mode support
- Custom theme creation
- Dynamic color generation
- Accessibility themes

---

This design system is continuously evolving to better serve the needs of solo entrepreneurs building their businesses.