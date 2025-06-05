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