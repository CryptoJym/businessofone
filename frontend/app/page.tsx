export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Business of One
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empowering one-person businesses to grow and thrive
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/design-system"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              View Design System
            </a>
            <a
              href="/docs/DESIGN_SYSTEM.md"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-500 text-primary-500 font-medium rounded-lg hover:bg-primary-50 transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}