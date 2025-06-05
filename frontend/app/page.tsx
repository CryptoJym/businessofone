import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Clock, Bot } from 'lucide-react'

export default function HomePage() {
  const painPoints = [
    "Running solo is rewarding but overwhelming",
    "Important growth tasks get sidelined",
    "Jack of all trades, master of none",
    "No clear path to scale"
  ]

  const solutions = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Strategic Growth",
      description: "Get clarity on your next steps with data-driven strategies"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Time Optimization",
      description: "Reclaim 20+ hours per week through smart systems"
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Smart Automation",
      description: "Let technology handle repetitive tasks while you focus on growth"
    }
  ]

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Transform Your Solo Business
                <span className="text-primary block">Without Hiring</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                One-stop consulting and tools to run your business like a world-class company
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary inline-flex items-center">
                  Get Your Free Business Strategy Session
                  <ArrowRight className="ml-2" />
                </Link>
                <Link href="/services" className="btn-secondary">
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Does This Sound Like You?
              </h2>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-xl font-semibold text-primary">
                You're not alone. We've helped 100+ solo businesses overcome these exact challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Your Path to Freedom & Growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {solutions.map((solution, index) => (
                <div key={index} className="card text-center">
                  <div className="flex justify-center mb-4">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of solo entrepreneurs who've built scalable, profitable businesses without the overhead.
            </p>
            <Link href="/services" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Explore Our Services
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}