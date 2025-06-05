import { Metadata } from 'next';
import { CTAButton } from '@/components/Button';
import { HeroImage } from '@/components/OptimizedImage';
import { PerformanceProvider } from '@/components/PerformanceProvider';

export const metadata: Metadata = {
  title: 'Business of One - Transform Your Solo Business',
  description: 'One-stop consulting and tools to run your business like a world-class company. Get your free business strategy session today.',
};

export default function Home() {
  return (
    <PerformanceProvider>
      <main className="min-h-screen">
        {/* Hero Section - Above the fold, optimized for LCP */}
        <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content - Left Side */}
              <div className="space-y-6 animate-fade-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Transform Your Solo Business
                  <span className="text-primary block mt-2">Without Hiring</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  One-stop consulting and tools to run your business like a world-class company. 
                  Join thousands of solopreneurs who've scaled their impact.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <CTAButton
                    className="text-lg px-8 py-4"
                    onClick={() => console.log('CTA clicked')}
                  >
                    Get Your Free Strategy Session
                  </CTAButton>
                  
                  <button className="inline-flex items-center justify-center text-primary hover:text-primary-dark transition-colors duration-fast">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch 2-min Demo
                  </button>
                </div>
                
                {/* Social Proof */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-muted border-2 border-background"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">2,847+</span> solo businesses transformed
                  </p>
                </div>
              </div>
              
              {/* Hero Image - Right Side */}
              <div className="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full">
                <div className="lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
                  <div className="w-full max-w-lg lg:max-w-none">
                    <div className="aspect-square lg:aspect-auto lg:h-[600px] relative">
                      {/* Placeholder for hero image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pain Points Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Running Solo Is Rewarding, But...
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We know the challenges you face every day as a solopreneur
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '😵',
                  title: 'Overwhelmed Daily',
                  description: 'Important growth tasks keep getting sidelined by urgent fires',
                },
                {
                  icon: '🎭',
                  title: 'Jack of All Trades',
                  description: "You're doing everything, but mastering nothing",
                },
                {
                  icon: '🗺️',
                  title: 'No Clear Path',
                  description: 'Scaling feels impossible without hiring a team',
                },
                {
                  icon: '🏝️',
                  title: 'Working IN, Not ON',
                  description: 'Your business owns you, not the other way around',
                },
              ].map((pain, index) => (
                <div
                  key={index}
                  className="text-center space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors duration-fast contain-layout"
                >
                  <div className="text-4xl">{pain.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground">{pain.title}</h3>
                  <p className="text-muted-foreground">{pain.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a personalized strategy session and discover how to scale without the overwhelm
            </p>
            <CTAButton
              className="text-lg px-8 py-4"
              onClick={() => console.log('Bottom CTA clicked')}
            >
              Start Your Free Strategy Session
            </CTAButton>
          </div>
        </section>
      </main>
    </PerformanceProvider>
  );
}
