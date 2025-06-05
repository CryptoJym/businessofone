export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#4169E1] border-t-transparent rounded-full animate-spin"></div>
            
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-[#16A085] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 font-medium">Loading your business insights...</p>
        <p className="mt-2 text-sm text-gray-500">This won't take long</p>
      </div>
    </div>
  )
}