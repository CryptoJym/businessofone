import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-utlyze-blue">
              Business of One
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-utlyze-blue transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-utlyze-blue transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-utlyze-blue transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-utlyze-blue transition-colors">
              Contact
            </Link>
            <Link 
              href="/consultation" 
              className="bg-utlyze-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}