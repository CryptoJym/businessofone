'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Check, X, ChevronDown, ChevronUp, Zap, TrendingUp, Bot, Users } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "How quickly can I see results from your services?",
      answer: "Most clients see initial improvements within the first 30 days. Our business audit typically uncovers quick wins that can be implemented immediately. Full transformation usually takes 3-6 months depending on your business complexity and implementation speed."
    },
    {
      question: "Do I need to commit to a long-term contract?",
      answer: "No long-term contracts required. Our Starter and Growth packages are one-time investments. The Scale package is month-to-month, and you can cancel anytime with 30 days notice."
    },
    {
      question: "What if I'm not tech-savvy? Can I still benefit from automation?",
      answer: "Absolutely! We specialize in setting up simple, user-friendly automation tools. We provide training and documentation for everything we implement, ensuring you're comfortable with all systems."
    },
    {
      question: "How do the strategy sessions work?",
      answer: "Strategy sessions are conducted via video call. We'll analyze your business beforehand, then work together to create actionable plans. Sessions include follow-up documentation and 30 days of email support."
    },
    {
      question: "What's the difference between the packages?",
      answer: "Starter focuses on foundation and quick wins. Growth adds comprehensive strategy and basic automation. Scale provides ongoing support, advanced automation, and continuous optimization. Choose based on your current needs and growth goals."
    },
    {
      question: "Can I upgrade my package later?",
      answer: "Yes! You can upgrade anytime. We'll credit 50% of your previous package cost toward the upgrade if done within 6 months."
    }
  ]

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const services = [
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Business Audit",
      description: "Comprehensive analysis of your business operations, identifying bottlenecks and opportunities for growth.",
      features: [
        "360° business assessment",
        "Competitive analysis",
        "Process optimization roadmap",
        "Quick win identification"
      ]
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Growth Strategy Sessions",
      description: "Personalized strategy sessions to create actionable growth plans tailored to your business.",
      features: [
        "Market positioning strategy",
        "Revenue optimization plan",
        "Customer acquisition roadmap",
        "Scaling preparation"
      ]
    },
    {
      icon: <Bot className="w-12 h-12 text-primary" />,
      title: "Automation Setup",
      description: "Implement smart automation to save time and reduce manual work in your business.",
      features: [
        "Workflow automation",
        "Email marketing setup",
        "CRM implementation",
        "Task management systems"
      ]
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Ongoing Advisory",
      description: "Continuous support and guidance as you implement changes and scale your business.",
      features: [
        "Monthly strategy calls",
        "Slack/email support",
        "Performance tracking",
        "Quarterly business reviews"
      ]
    }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$997",
      period: "one-time",
      description: "Perfect for solopreneurs ready to optimize",
      features: [
        { name: "Business Audit", included: true },
        { name: "Quick Wins Report", included: true },
        { name: "30-day Email Support", included: true },
        { name: "Basic Process Templates", included: true },
        { name: "Growth Strategy Session", included: false },
        { name: "Automation Setup", included: false },
        { name: "Ongoing Advisory", included: false },
        { name: "Priority Support", included: false }
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Growth",
      price: "$2,497",
      period: "one-time",
      description: "For businesses ready to scale",
      features: [
        { name: "Business Audit", included: true },
        { name: "Quick Wins Report", included: true },
        { name: "90-day Email Support", included: true },
        { name: "Premium Process Templates", included: true },
        { name: "Growth Strategy Session", included: true },
        { name: "Basic Automation Setup", included: true },
        { name: "3 Follow-up Calls", included: true },
        { name: "Priority Support", included: false }
      ],
      cta: "Scale Your Business",
      highlighted: true
    },
    {
      name: "Scale",
      price: "$997",
      period: "/month",
      description: "Comprehensive support for ambitious solopreneurs",
      features: [
        { name: "Everything in Growth", included: true },
        { name: "Monthly Strategy Calls", included: true },
        { name: "Advanced Automation", included: true },
        { name: "Ongoing Advisory", included: true },
        { name: "Priority Support", included: true },
        { name: "Quarterly Business Reviews", included: true },
        { name: "Custom Integrations", included: true },
        { name: "Unlimited Email Support", included: true }
      ],
      cta: "Transform Your Business",
      highlighted: false
    }
  ]

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Solo Business
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get the expertise, systems, and support you need to run your business like a pro—without hiring a team.
            </p>
            <a href="#pricing" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              View Pricing Plans
            </a>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} id={service.title.toLowerCase().replace(' ', '-')} className="card">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                            {feature}
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
        <section id="pricing" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Choose the package that fits your business needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-8 ${
                    plan.highlighted
                      ? 'bg-primary text-white shadow-2xl scale-105'
                      : 'bg-white border-2 border-gray-200'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="bg-accent text-white text-center py-2 px-4 rounded-full text-sm font-semibold mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={plan.highlighted ? 'text-white/80' : 'text-gray-600'}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mb-6 ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        {feature.included ? (
                          <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                            plan.highlighted ? 'text-white' : 'text-accent'
                          }`} />
                        ) : (
                          <X className={`w-5 h-5 mr-3 flex-shrink-0 ${
                            plan.highlighted ? 'text-white/40' : 'text-gray-300'
                          }`} />
                        )}
                        <span className={
                          !feature.included
                            ? plan.highlighted ? 'text-white/60' : 'text-gray-400'
                            : ''
                        }>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="/contact"
                    className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-white text-primary hover:bg-gray-100'
                        : 'bg-primary text-white hover:bg-primary-600'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Package Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold">Features</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold bg-primary text-white">Growth</th>
                    <th className="text-center p-4 font-semibold">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Full Business Audit</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                    <td className="text-center p-4 bg-primary-50"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Strategy Sessions</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-primary-50">1 session</td>
                    <td className="text-center p-4">Monthly</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Automation Setup</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-primary-50">Basic</td>
                    <td className="text-center p-4">Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Support Duration</td>
                    <td className="text-center p-4">30 days</td>
                    <td className="text-center p-4 bg-primary-50">90 days</td>
                    <td className="text-center p-4">Ongoing</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">Implementation Help</td>
                    <td className="text-center p-4">Email only</td>
                    <td className="text-center p-4 bg-primary-50">Email + 3 calls</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4">Investment</td>
                    <td className="text-center p-4 font-bold">$997</td>
                    <td className="text-center p-4 bg-primary-50 font-bold">$2,497</td>
                    <td className="text-center p-4 font-bold">$997/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Business of One?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">10+</span>
                </div>
                <h3 className="font-semibold mb-2">Years of Experience</h3>
                <p className="text-gray-600">Helping solo businesses scale efficiently</p>
              </div>
              <div className="text-center">
                <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3x</span>
                </div>
                <h3 className="font-semibold mb-2">Average Revenue Growth</h3>
                <p className="text-gray-600">Within the first year of implementation</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">20h</span>
                </div>
                <h3 className="font-semibold mb-2">Time Saved Weekly</h3>
                <p className="text-gray-600">Through smart automation and systems</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQSection />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-700 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of solo business owners who've scaled their operations without the overhead of hiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Book Free Strategy Call
              </a>
              <a href="#pricing" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )

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