interface FormErrorProps {
  errors: string | string[] | Record<string, string[]>
  className?: string
}

export default function FormError({ errors, className = '' }: FormErrorProps) {
  if (!errors) return null

  // Handle single error string
  if (typeof errors === 'string') {
    return (
      <div className={`text-sm text-red-600 mt-1 ${className}`}>
        {errors}
      </div>
    )
  }

  // Handle array of errors
  if (Array.isArray(errors)) {
    return (
      <ul className={`text-sm text-red-600 mt-1 space-y-1 ${className}`}>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )
  }

  // Handle object of field errors
  return (
    <div className={`space-y-2 ${className}`}>
      {Object.entries(errors).map(([field, fieldErrors]) => (
        <div key={field}>
          <p className="text-sm font-medium text-red-600 capitalize">
            {field.replace(/_/g, ' ')}:
          </p>
          <ul className="text-sm text-red-600 ml-2 list-disc list-inside">
            {fieldErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}