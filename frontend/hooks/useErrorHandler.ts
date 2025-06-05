'use client'

import { useState, useCallback } from 'react'

interface ErrorInfo {
  message: string
  code?: string
  details?: any
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleError = useCallback((error: unknown) => {
    console.error('Error caught:', error)
    
    if (error instanceof Error) {
      setError({
        message: error.message,
        details: error
      })
    } else if (typeof error === 'string') {
      setError({
        message: error
      })
    } else if (error && typeof error === 'object' && 'message' in error) {
      setError({
        message: (error as any).message,
        code: (error as any).code,
        details: error
      })
    } else {
      setError({
        message: 'An unexpected error occurred'
      })
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const execute = useCallback(async <T,>(
    asyncFunction: () => Promise<T>
  ): Promise<T | undefined> => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await asyncFunction()
      return result
    } catch (err) {
      handleError(err)
      return undefined
    } finally {
      setIsLoading(false)
    }
  }, [handleError])

  return {
    error,
    isLoading,
    handleError,
    clearError,
    execute
  }
}