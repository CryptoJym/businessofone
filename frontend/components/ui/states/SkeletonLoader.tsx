interface SkeletonLoaderProps {
  lines?: number
  className?: string
  type?: 'text' | 'card' | 'table'
}

export default function SkeletonLoader({ 
  lines = 3, 
  className = '',
  type = 'text'
}: SkeletonLoaderProps) {
  if (type === 'card') {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="mt-6 flex space-x-3">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          {[...Array(lines)].map((_, i) => (
            <div key={i} className="flex space-x-4 py-3 border-b border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-3">
        {[...Array(lines)].map((_, i) => (
          <div 
            key={i} 
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
          ></div>
        ))}
      </div>
    </div>
  )
}