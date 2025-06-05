import Image from "next/image";
import { ConsultationForm } from "@/components/forms/consultation-form"
import { NewsletterForm } from "@/components/forms/newsletter-form"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-20 pb-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Solo Business – Without Hiring
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              One-stop consulting and tools to run your business like a world-class company
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get Your Free Business Strategy Session
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Download Free Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Running Solo Is Rewarding, But...
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😰</span>
              </div>
              <h3 className="font-semibold mb-2">Overwhelming Tasks</h3>
              <p className="text-gray-600">Important growth tasks keep getting sidelined</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤹</span>
              </div>
              <h3 className="font-semibold mb-2">Jack of All Trades</h3>
              <p className="text-gray-600">Master of none - spreading yourself too thin</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-semibold mb-2">No Clear Path</h3>
              <p className="text-gray-600">Unclear how to scale without hiring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold mb-2">Time Crunch</h3>
              <p className="text-gray-600">Working IN the business, not ON it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Path to Solo Success
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Audit & Optimization</h3>
                    <p className="text-gray-600">Identify gaps and quick wins in your operations</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Growth Strategy Development</h3>
                    <p className="text-gray-600">Create a clear roadmap to scale your business</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Automation Implementation</h3>
                    <p className="text-gray-600">Set up systems that work while you sleep</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Ongoing Advisory Support</h3>
                    <p className="text-gray-600">Get expert guidance whenever you need it</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-600 mb-6">
                Book a free strategy session and discover how to work smarter, not harder
              </p>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#4169E1] text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join 5,000+ Solo Business Owners
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get weekly tips and strategies to grow your business without burning out
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <NewsletterForm showName={true} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <p className="mb-4">© 2024 Business of One. All rights reserved.</p>
            <p className="text-sm">
              Part of the Utlyze "Of One" suite - empowering solo professionals everywhere.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
