import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Business of One
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-primary font-semibold">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-primary">Services</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Solo Business
              <span className="block text-primary">Without Hiring</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              One-stop consulting and tools to run your business like a world-class company. 
              Get the strategies, systems, and support you need to scale efficiently.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/services" 
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors"
              >
                Get Your Free Strategy Session
              </Link>
              <Link 
                href="/services#pricing" 
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            The Solo Business Challenge
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">😵</div>
              <h3 className="text-xl font-semibold mb-2">Overwhelming</h3>
              <p className="text-gray-600">
                Running solo is rewarding but the workload never stops
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Time Crunch</h3>
              <p className="text-gray-600">
                Important growth tasks get sidelined by daily operations
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Jack of All Trades</h3>
              <p className="text-gray-600">
                Wearing too many hats prevents mastery in any area
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Scaling Struggles</h3>
              <p className="text-gray-600">
                No clear path to scale without building a team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Your Complete Business Transformation
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Everything you need to run your business like a pro, without the complexity
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-accent text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Business Audit</h3>
              <p className="text-gray-600">
                Comprehensive analysis to identify your biggest opportunities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-accent text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Growth Strategy</h3>
              <p className="text-gray-600">
                Custom roadmap designed for sustainable solo scaling
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-accent text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Automation</h3>
              <p className="text-gray-600">
                Smart systems that work while you focus on what matters
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-accent text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                Your personal advisor for continuous optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join hundreds of solo business owners who've scaled successfully
          </p>
          <Link 
            href="/services" 
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            See Our Services & Pricing
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Business of One</h4>
              <p className="text-gray-400">
                Empowering solo businesses to scale and thrive.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/services" className="hover:text-white">Services</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Business Audit</li>
                <li>Growth Strategy</li>
                <li>Automation</li>
                <li>Advisory Support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Connect</h5>
              <p className="text-gray-400">
                Part of the Utlyze "Of One" suite
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Business of One. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Navigation from './components/Navigation'

export default function HomePage() {
  return (
    <>
      <Navigation />
      
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Solo Business – Without Hiring
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            One-stop consulting and tools to run your business like a world-class company
          </p>
          <a 
            href="/consultation" 
            className="inline-block bg-utlyze-blue text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-blue-600 transition-colors"
          >
            Get Your Free Business Strategy Session
          </a>
        </div>
      </section>
    </>
  )
}
