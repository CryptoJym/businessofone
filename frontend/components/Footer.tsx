import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Business of One</h3>
            <p className="text-gray-400">
              Transform your solo business without hiring. Get the support you need to scale.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services#audit" className="hover:text-white transition-colors">Business Audit</Link></li>
              <li><Link href="/services#strategy" className="hover:text-white transition-colors">Growth Strategy</Link></li>
              <li><Link href="/services#automation" className="hover:text-white transition-colors">Automation Setup</Link></li>
              <li><Link href="/services#advisory" className="hover:text-white transition-colors">Ongoing Advisory</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <p className="text-gray-400 mb-4">
              Ready to transform your business? Book your free strategy session today.
            </p>
            <Link href="/contact" className="btn-primary">
              Book Free Session
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Business of One. Part of the Utlyze "Of One" suite.</p>
        </div>
      </div>
    </footer>
  )
}