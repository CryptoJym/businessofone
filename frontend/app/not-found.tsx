import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-[#4169E1]">
            Page Not Found
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Oops! This page doesn't exist
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Just like running a business solo, sometimes we take a wrong turn. 
            Let's get you back on track.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#4169E1] hover:bg-[#3659D1] rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go to Homepage
          </Link>
          
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Link href="/contact" className="text-[#16A085] hover:underline">
              Contact Support
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/resources" className="text-[#16A085] hover:underline">
              Browse Resources
            </Link>
          </div>
        </div>

        <div className="mt-12 text-xs text-gray-500">
          Error Code: 404 | Business of One
        </div>
      </div>
    </div>
  )
}