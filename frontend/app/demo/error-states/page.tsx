'use client'

import { useState } from 'react'
import { 
  EmptyState, 
  ErrorState, 
  LoadingSpinner, 
  SkeletonLoader,
  FormError 
} from '@/components/ui/states'
import { useErrorHandler } from '@/hooks/useErrorHandler'

export default function ErrorStatesDemo() {
  const [showEmpty, setShowEmpty] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [formErrors, setFormErrors] = useState<any>(null)
  const { error, isLoading, execute } = useErrorHandler()

  const simulateAsyncError = async () => {
    await execute(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      throw new Error('This is a simulated API error')
    })
  }

  const triggerNotFound = () => {
    window.location.href = '/this-page-does-not-exist'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Error Pages & States Demo
        </h1>

        {/* Demo Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Interactive Demo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowEmpty(!showEmpty)}
              className="px-4 py-2 bg-[#4169E1] text-white rounded hover:bg-[#3659D1] transition-colors"
            >
              Toggle Empty State
            </button>
            <button
              onClick={() => setShowError(!showError)}
              className="px-4 py-2 bg-[#4169E1] text-white rounded hover:bg-[#3659D1] transition-colors"
            >
              Toggle Error State
            </button>
            <button
              onClick={() => setShowLoading(!showLoading)}
              className="px-4 py-2 bg-[#4169E1] text-white rounded hover:bg-[#3659D1] transition-colors"
            >
              Toggle Loading
            </button>
            <button
              onClick={() => setShowSkeleton(!showSkeleton)}
              className="px-4 py-2 bg-[#4169E1] text-white rounded hover:bg-[#3659D1] transition-colors"
            >
              Toggle Skeleton
            </button>
            <button
              onClick={simulateAsyncError}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Trigger Async Error
            </button>
            <button
              onClick={triggerNotFound}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Trigger 404
            </button>
          </div>
        </div>

        {/* Error Handler Demo */}
        {(error || isLoading) && (
          <div className="mb-8">
            {isLoading ? (
              <LoadingSpinner message="Processing request..." />
            ) : error ? (
              <ErrorState 
                title="API Error" 
                message={error.message}
                retry={() => window.location.reload()}
              />
            ) : null}
          </div>
        )}

        {/* Empty State Demo */}
        {showEmpty && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Empty State Example</h3>
            <EmptyState
              title="No business data yet"
              description="Start by adding your first business metric or connecting your tools."
              icon={
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              action={{
                label: "Add First Metric",
                onClick: () => alert('Adding metric...')
              }}
            />
          </div>
        )}

        {/* Error State Demo */}
        {showError && (
          <div className="mb-8">
            <ErrorState 
              title="Failed to load data"
              message="We couldn't fetch your business metrics. Please check your connection and try again."
              retry={() => setShowError(false)}
            />
          </div>
        )}

        {/* Loading Spinner Demo */}
        {showLoading && (
          <div className="bg-white rounded-lg shadow p-12 mb-8">
            <LoadingSpinner size="lg" message="Loading your dashboard..." />
          </div>
        )}

        {/* Skeleton Loader Demo */}
        {showSkeleton && (
          <div className="space-y-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Text Skeleton</h3>
              <SkeletonLoader lines={4} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Card Skeleton</h3>
              <SkeletonLoader type="card" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Table Skeleton</h3>
              <SkeletonLoader type="table" lines={5} />
            </div>
          </div>
        )}

        {/* Form Error Demo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Form Error Examples</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Single Error
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-red-300 rounded-md"
                placeholder="Invalid input"
              />
              <FormError errors="This field is required" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Multiple Errors
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-red-300 rounded-md"
                placeholder="Multiple validation errors"
              />
              <FormError errors={[
                "Minimum length is 8 characters",
                "Must contain at least one number",
                "Must contain at least one special character"
              ]} />
            </div>

            <button
              onClick={() => setFormErrors({
                email: ["Invalid email format", "Email already taken"],
                password: ["Password is too weak"]
              })}
              className="px-4 py-2 bg-[#16A085] text-white rounded hover:bg-[#138f76] transition-colors"
            >
              Show Field Errors
            </button>

            {formErrors && (
              <div className="p-4 bg-red-50 rounded">
                <FormError errors={formErrors} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}