interface LegalLayoutProps {
  children: React.ReactNode;
  currentPage?: 'privacy' | 'terms' | 'cookies' | 'legal';
}

export default function LegalLayout({ children, currentPage }: LegalLayoutProps) {
  const navItems = [
    { href: '/legal', label: 'Overview', key: 'legal' },
    { href: '/privacy', label: 'Privacy Policy', key: 'privacy' },
    { href: '/terms', label: 'Terms of Service', key: 'terms' },
    { href: '/cookies', label: 'Cookie Policy', key: 'cookies' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <a href="/" className="text-2xl font-bold text-gray-900">
              Business of One
            </a>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="/legal" className="text-gray-900 font-medium">Legal</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Legal Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  currentPage === item.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Business of One</h3>
              <p className="text-gray-400">
                Professional consulting services for solo entrepreneurs and small businesses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@businessofone.com</li>
                <li>Phone: [Your Phone Number]</li>
                <li>Address: [Your Address]</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Business of One. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}