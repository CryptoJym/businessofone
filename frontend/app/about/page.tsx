import Navigation from '../components/Navigation'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empowering Solo Entrepreneurs to Build World-Class Businesses
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            At Business of One, we believe every solo entrepreneur deserves the tools, strategies, 
            and support typically reserved for large corporations.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Business of One was born from a simple observation: solo entrepreneurs are the backbone 
              of innovation and economic growth, yet they often struggle with the overwhelming demands 
              of running every aspect of their business alone.
            </p>
            <p className="mb-6">
              We've walked in your shoes. We know what it's like to be the CEO, accountant, marketer, 
              salesperson, and customer service representative all rolled into one. We understand the 
              late nights, the constant juggling, and the feeling that important growth opportunities 
              are slipping through your fingers.
            </p>
            <p className="mb-6">
              That's why we created Business of One – a comprehensive consulting and optimization 
              service designed specifically for solo entrepreneurs who refuse to compromise on their 
              vision of building something extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Mission & Values</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-utlyze-blue mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To transform solo businesses into efficient, scalable operations by providing 
                world-class consulting, tools, and strategies – enabling entrepreneurs to focus 
                on what they do best while we handle the rest.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-utlyze-blue mb-4">Our Promise</h3>
              <p className="text-gray-600 leading-relaxed">
                We promise to treat your business as if it were our own, providing personalized 
                strategies that respect your unique vision while dramatically improving your 
                operations and growth potential.
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Empathy First</h4>
              <p className="text-gray-600">
                We understand the unique challenges of running a solo business because we've been there.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Practical Solutions</h4>
              <p className="text-gray-600">
                No fluff, no theory – just actionable strategies that deliver real results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Growth Without Compromise</h4>
              <p className="text-gray-600">
                Scale your business without losing your autonomy or vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Solo Entrepreneurs Choose Us</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-utlyze-blue rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">We Speak Your Language</h3>
                <p className="text-gray-600">
                  No corporate jargon or one-size-fits-all solutions. We understand that your business 
                  is unique and deserves personalized attention.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-utlyze-blue rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Results You Can Measure</h3>
                <p className="text-gray-600">
                  Our strategies are designed to deliver tangible improvements in efficiency, revenue, 
                  and work-life balance – not just good feelings.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-utlyze-blue rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ongoing Partnership</h3>
                <p className="text-gray-600">
                  We're not just consultants who disappear after delivering a report. We're your 
                  long-term partners in growth, available whenever you need guidance.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-utlyze-blue rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Technology That Works For You</h3>
                <p className="text-gray-600">
                  We help you leverage automation and modern tools without the overwhelm, selecting 
                  only what truly moves the needle for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-utlyze-blue py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Solo Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of solo entrepreneurs who've discovered what it means to run their 
            business like a world-class company.
          </p>
          <a 
            href="/consultation" 
            className="inline-block bg-white text-utlyze-blue px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Your Free Business Strategy Session
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">© 2024 Business of One. All rights reserved.</p>
          <p className="text-sm">Part of the Utlyze "Of One" suite – empowering solo professionals everywhere.</p>
        </div>
      </footer>
    </>
  )
}