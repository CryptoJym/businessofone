# Error Pages & States Documentation

## Overview

This document describes the error handling system implemented for Business of One, including error pages, loading states, and error components.

## Error Pages

### 404 - Not Found Page (`app/not-found.tsx`)
- Automatically displayed when a route is not found
- Features Business of One branding
- Provides navigation back to homepage and support links

### Global Error Boundary (`app/error.tsx`)
- Catches all unhandled errors in the application
- Provides a "Try Again" button to recover from errors
- Logs errors for debugging (can be integrated with error tracking services)

### Loading Page (`app/loading.tsx`)
- Displayed during page transitions and data fetching
- Features animated spinner with Business of One branding
- Shows contextual loading messages

## Reusable State Components

All state components are located in `components/ui/states/` and can be imported from the index file:

```typescript
import { EmptyState, ErrorState, LoadingSpinner, SkeletonLoader, FormError, OfflineState } from '@/components/ui/states'
```

### EmptyState
Used when there's no data to display.

```typescript
<EmptyState
  title="No business data yet"
  description="Start by adding your first business metric."
  icon={<YourIconComponent />}
  action={{
    label: "Add Metric",
    onClick: handleAddMetric
  }}
/>
```

### ErrorState
For displaying errors within sections of the page.

```typescript
<ErrorState
  title="Failed to load data"
  message="Please check your connection and try again."
  retry={handleRetry}
  className="mt-4"
/>
```

### LoadingSpinner
Flexible loading indicator with size options.

```typescript
<LoadingSpinner 
  size="lg" // 'sm' | 'md' | 'lg'
  message="Loading your data..."
/>
```

### SkeletonLoader
Content placeholder while loading.

```typescript
// Text skeleton
<SkeletonLoader lines={3} />

// Card skeleton
<SkeletonLoader type="card" />

// Table skeleton
<SkeletonLoader type="table" lines={5} />
```

### FormError
Display validation errors for forms.

```typescript
// Single error
<FormError errors="This field is required" />

// Multiple errors
<FormError errors={["Error 1", "Error 2"]} />

// Field-specific errors
<FormError errors={{
  email: ["Invalid format", "Already exists"],
  password: ["Too weak"]
}} />
```

### OfflineState
Automatically displays when the user loses internet connection. Already integrated in the root layout.

## Custom Hook: useErrorHandler

A custom hook for centralized error handling in components.

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler'

function MyComponent() {
  const { error, isLoading, execute, clearError } = useErrorHandler()

  const fetchData = async () => {
    const result = await execute(async () => {
      const response = await fetch('/api/data')
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    })
    
    if (result) {
      // Handle successful result
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorState message={error.message} retry={fetchData} />
  
  return <YourContent />
}
```

## Demo Page

Visit `/demo/error-states` to see all error states in action with interactive controls.

## Best Practices

1. **Use appropriate error states**: Choose the right component for each scenario
2. **Provide helpful messages**: Give users clear information about what went wrong
3. **Always offer recovery options**: Include retry buttons or alternative actions
4. **Log errors properly**: Use the error boundary and hook to capture error details
5. **Test error scenarios**: Ensure your error handling works in production

## Styling

All error components use the Business of One color scheme:
- Primary: `#4169E1` (Utlyze Blue)
- Accent: `#16A085`
- Error colors follow standard patterns (red for errors, orange for warnings)

## Integration with Error Tracking

The error boundary and useErrorHandler hook include console.error calls that can be replaced with your preferred error tracking service (e.g., Sentry, LogRocket):

```typescript
// In app/error.tsx or hooks/useErrorHandler.ts
useEffect(() => {
  // Replace with your error tracking service
  // Sentry.captureException(error)
  console.error(error)
}, [error])
```