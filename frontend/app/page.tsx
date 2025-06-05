'use client';

import { AccessibilityProvider } from '@/src/contexts/AccessibilityContext';
import { SkipLinks } from '@/src/components/a11y/SkipLinks';
import { AccessibilityPanel } from '@/src/components/a11y/AccessibilityPanel';
import { Button } from '@/src/components/ui/Button';
import { useAnnounce, useHeadingHierarchy } from '@/src/hooks/useA11y';
import { colors } from '@/src/styles/design-system';
import '@/src/styles/accessibility.css';

function DemoContent() {
  const { announcePolite } = useAnnounce();
  const { isValid, errors } = useHeadingHierarchy();
  
  const handleCTAClick = () => {
    announcePolite('Strategy session booking form will open');
    // In a real app, this would open a booking modal or navigate to a form
  };
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 bg-white shadow-sm z-50" role="banner">
        <nav id="navigation" className="container mx-auto px-4 py-4" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold" style={{ color: colors.primary[500] }}>
              Business of One
            </a>
            <ul className="flex gap-6">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>
      
      <main id="main" tabIndex={-1}>
        {/* Hero Section */}
        <section className="py-20 px-4" aria-labelledby="hero-heading">
          <div className="container mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl font-bold mb-6">
              Transform Your Solo Business – Without Hiring
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              One-stop consulting and tools to run your business like a world-class company.
              Built with accessibility at its core.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleCTAClick}
              aria-label="Get Your Free Business Strategy Session - Opens booking form"
            >
              Get Your Free Business Strategy Session
            </Button>
          </div>
        </section>
        
        {/* Accessibility Features Section */}
        <section id="features" className="py-16 px-4 bg-gray-50" aria-labelledby="features-heading">
          <div className="container mx-auto">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">
              Accessibility Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Keyboard Navigation</h3>
                <p>Full keyboard support with visible focus indicators and skip links for efficient navigation.</p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Screen Reader Support</h3>
                <p>Comprehensive ARIA labels, live regions, and semantic HTML for optimal screen reader experience.</p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Color Modes</h3>
                <p>Light, dark, and high-contrast themes with WCAG AAA compliant color ratios.</p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Motion Control</h3>
                <p>Respects prefers-reduced-motion with options to disable all animations.</p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Text Scaling</h3>
                <p>Adjustable font sizes from small to extra-large for better readability.</p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Color Blind Modes</h3>
                <p>Support for protanopia, deuteranopia, tritanopia, and monochromacy.</p>
              </article>
            </div>
          </div>
        </section>
        
        {/* Demo Section */}
        <section className="py-16 px-4" aria-labelledby="demo-heading">
          <div className="container mx-auto">
            <h2 id="demo-heading" className="text-3xl font-bold text-center mb-12">
              Try the Accessibility Features
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="sm">
                    Secondary Button
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost Button
                  </Button>
                  <Button variant="danger" size="sm">
                    Danger Button
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Form Example</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Name <span aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border rounded-md"
                      required
                      aria-required="true"
                      aria-describedby="name-help"
                    />
                    <p id="name-help" className="text-sm text-gray-600 mt-1">
                      Enter your full name
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email <span aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border rounded-md"
                      required
                      aria-required="true"
                      aria-describedby="email-help"
                    />
                    <p id="email-help" className="text-sm text-gray-600 mt-1">
                      We'll never share your email
                    </p>
                  </div>
                  
                  <Button type="submit" fullWidth>
                    Submit Form
                  </Button>
                </form>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200" role="region" aria-label="Accessibility tip">
                <h3 className="text-xl font-semibold mb-3">💡 Accessibility Tip</h3>
                <p>
                  Click the accessibility button in the bottom right corner to customize your experience.
                  You can change color themes, font sizes, enable motion preferences, and more!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Heading Hierarchy Check (Development Only) */}
        {!isValid && (
          <div className="fixed bottom-20 left-4 bg-red-100 p-4 rounded-lg max-w-sm" role="alert">
            <h4 className="font-semibold">Heading Hierarchy Issues:</h4>
            <ul className="text-sm mt-2">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 text-white py-8 px-4" role="contentinfo">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Business of One. All rights reserved.</p>
          <p className="mt-2">
            Part of the Utlyze "Of One" suite - empowering solo professionals everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <AccessibilityProvider>
      <SkipLinks />
      <DemoContent />
      <AccessibilityPanel />
      
      {/* SVG Filters for Color Blindness (hidden) */}
      <svg className="color-blind-filters" aria-hidden="true">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0     0 0
                      0.558 0.442 0     0 0
                      0     0.242 0.758 0 0
                      0     0     0     1 0"
            />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0   0 0
                      0.7   0.3   0   0 0
                      0     0.3   0.7 0 0
                      0     0     0   1 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05  0     0 0
                      0    0.433 0.567 0 0
                      0    0.475 0.525 0 0
                      0    0     0     1 0"
            />
          </filter>
        </defs>
      </svg>
    </AccessibilityProvider>
  );
}
