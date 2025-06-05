import Link from 'next/link';

const services = [
  {
    title: "Business Audit & Assessment",
    description: "Comprehensive analysis of your current operations to identify growth opportunities",
    features: [
      "Complete business health check",
      "Operational efficiency analysis",
      "Growth opportunity identification",
      "Competitive landscape review",
      "Personalized improvement roadmap"
    ],
    icon: "📊"
  },
  {
    title: "Growth Strategy Development",
    description: "Custom strategies designed specifically for scaling solo businesses",
    features: [
      "Market expansion planning",
      "Revenue optimization strategies",
      "Customer acquisition frameworks",
      "Scalable systems design",
      "90-day action plans"
    ],
    icon: "🚀"
  },
  {
    title: "Automation Implementation",
    description: "Streamline your operations with smart automation solutions",
    features: [
      "Process automation setup",
      "Tool stack optimization",
      "Workflow design & implementation",
      "Time-saving integrations",
      "Training & documentation"
    ],
    icon: "⚡"
  },
  {
    title: "Ongoing Advisory Support",
    description: "Your personal business advisor for continuous growth and optimization",
    features: [
      "Monthly strategy sessions",
      "On-demand consultations",
      "Performance tracking",
      "Resource library access",
      "Community membership"
    ],
    icon: "🎯"
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$497",
    period: "one-time",
    description: "Perfect for getting started with professional business optimization",
    features: [
      "Complete business audit",
      "Growth opportunity report",
      "30-day action plan",
      "2 hour consultation",
      "Email support for 30 days"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Growth",
    price: "$997",
    period: "/month",
    description: "For solo businesses ready to scale systematically",
    features: [
      "Everything in Starter",
      "Monthly strategy sessions",
      "Automation implementation",
      "Priority email & chat support",
      "Resource library access",
      "Quarterly business reviews"
    ],
    cta: "Start Growing",
    popular: true
  },
  {
    name: "Transform",
    price: "$2,497",
    period: "/month",
    description: "Complete transformation with dedicated advisory support",
    features: [
      "Everything in Growth",
      "Weekly advisory calls",
      "Custom automation projects",
      "Direct phone/text access",
      "Team training (if applicable)",
      "Annual planning sessions"
    ],
    cta: "Transform Now",
    popular: false
  }
];

export default function ServicesPage() {
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
              <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
              <Link href="/services" className="text-primary font-semibold">Services</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Services & Pricing
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Choose the perfect plan to transform your solo business into a scalable, 
            efficient operation that runs like a world-class company.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed specifically for one-person businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Investment levels designed to match your growth stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                  plan.popular ? 'ring-2 ring-primary relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-primary text-white hover:bg-primary-600' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                How quickly can I see results?
              </h3>
              <p className="text-gray-600">
                Most clients see initial improvements within 30 days. Our structured approach ensures 
                you're implementing changes that deliver immediate impact while building toward long-term growth.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Do I need technical skills?
              </h3>
              <p className="text-gray-600">
                Not at all. We handle all technical implementations and provide step-by-step guidance 
                for any tools or systems we recommend. Our goal is to make everything accessible and easy to manage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade or downgrade your plan at any time. We'll prorate any payments 
                and ensure a smooth transition between service levels.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What if I'm not satisfied?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee on all plans. If you're not seeing value from our 
                services, we'll refund your investment, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Solo Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book your free strategy session and discover how to scale without hiring
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Get Your Free Business Strategy Session
          </button>
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