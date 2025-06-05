# Animation & Interactions Guide

## Overview

This guide documents all the animations and interactions implemented in the Business of One landing page for Stream 15.

## Technologies Used

- **Framer Motion**: Primary animation library for React
- **Tailwind CSS**: Custom animations and transitions
- **React Intersection Observer**: Scroll-triggered animations
- **Lucide React**: Animated icons

## Animation Categories

### 1. Page Load Animations

#### Hero Section
- **Fade Up**: Main headline and subheadline fade in with upward motion
- **Word Reveal**: Sequential word animation for dramatic effect
- **Staggered Elements**: CTAs and supporting text appear with delays
- **Background Blobs**: Floating animated gradients for visual interest

### 2. Scroll-Triggered Animations

#### Custom Hook: `useScrollAnimation`
```tsx
const [ref, controls] = useScrollAnimation({
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '0px'
})
```

#### Implementation
- Features section scales in when scrolled into view
- Benefits section fades up with staggered items
- CTA section animates on scroll

### 3. Micro-Interactions

#### Buttons
- **Hover Scale**: Buttons scale up on hover (1.05x)
- **Tap Scale**: Buttons scale down on click (0.95x)
- **Shimmer Effect**: Animated gradient overlay on hover
- **Spring Animation**: Natural feeling transitions

#### Cards
- **Hover Lift**: Cards translate up 5px on hover
- **Glow Effect**: Optional glow shadow on hover
- **Background Fade**: Gradient background fades in on hover
- **Icon Rotation**: Icons rotate 360° on hover

### 4. Loading States

#### Loading Spinner
- Continuous rotation animation
- Available in three sizes (sm, md, lg)
- Customizable colors via Tailwind classes

### 5. Text Animations

#### AnimatedText Component
Three variants available:
1. **fadeUp**: Letters fade in from bottom
2. **typewriter**: Letters slide in from left
3. **wordReveal**: Words appear sequentially

### 6. Utility Classes

#### Tailwind Custom Animations
```css
.animate-fade-in
.animate-fade-up
.animate-fade-down
.animate-slide-in-right
.animate-slide-in-left
.animate-scale-up
.animate-bounce-gentle
.animate-pulse-gentle
.animate-float
.animate-shimmer
```

#### Utility Effects
```css
.hover-lift      /* Hover lift effect */
.glass          /* Glassmorphism */
.glow           /* Glow shadow */
.shimmer        /* Loading shimmer */
.text-gradient  /* Gradient text */
.focus-ring     /* Accessible focus states */
```

## Animation Variants

### Framer Motion Variants

```typescript
// Fade animations
fadeInUp, fadeInDown, fadeIn

// Slide animations
slideInFromLeft, slideInFromRight

// Scale animations
scaleIn

// Container animations
containerVariants (with staggered children)

// Special effects
float, textReveal, progressBar
```

## Best Practices Implemented

1. **Performance**
   - Using CSS transforms for animations (GPU accelerated)
   - Lazy loading animations with Intersection Observer
   - Minimal re-renders with proper React patterns

2. **Accessibility**
   - Respecting `prefers-reduced-motion` preference
   - Proper focus states for keyboard navigation
   - ARIA labels where needed

3. **User Experience**
   - Subtle, non-distracting animations
   - Quick animation durations (0.3s - 0.5s)
   - Natural easing curves
   - Consistent animation language

## Usage Examples

### Basic Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### With Variants
```tsx
<motion.div
  variants={fadeInUp}
  initial="initial"
  animate="animate"
>
  Content
</motion.div>
```

### Scroll Animation
```tsx
const [ref, controls] = useScrollAnimation()

<motion.div
  ref={ref}
  animate={controls}
  variants={containerVariants}
>
  Content
</motion.div>
```

## Component Library

### AnimatedButton
- Primary, secondary, and outline variants
- Three sizes (sm, md, lg)
- Built-in hover and tap animations

### AnimatedCard
- Hover lift effect
- Optional glow effect
- Background gradient animation

### AnimatedText
- Three animation variants
- Customizable timing
- Letter or word-based animations

### ScrollIndicator
- Bouncing animation
- Click to scroll functionality
- Fade in on load

### LoadingSpinner
- Continuous rotation
- Three sizes
- Customizable colors

## Future Enhancements

1. **Page Transitions**: Smooth transitions between pages
2. **Parallax Effects**: Depth and movement on scroll
3. **Interactive Demos**: Product feature demonstrations
4. **Progress Indicators**: Visual feedback for multi-step processes
5. **Gesture Animations**: Swipe and drag interactions
6. **3D Transforms**: Advanced perspective effects

## Maintenance

To modify animations:
1. Update animation variants in `/lib/animations.ts`
2. Adjust Tailwind animations in `tailwind.config.ts`
3. Modify component-specific animations in their respective files

Remember to test animations on:
- Different devices and screen sizes
- Various browsers
- With reduced motion preferences enabled