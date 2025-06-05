'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface CaseStudyDetail {
  id: string;
  title: string;
  client: string;
  business: string;
  industry: string;
  duration: string;
  heroImage: string;
  summary: string;
  challenge: {
    overview: string;
    painPoints: string[];
  };
  solution: {
    overview: string;
    strategies: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  process: {
    phase: string;
    description: string;
    outcomes: string[];
  }[];
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
    icon: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  keyTakeaways: string[];
  nextSteps: {
    title: string;
    description: string;
    cta: string;
  };
}

// This would typically come from a database or CMS
const caseStudiesData: Record<string, CaseStudyDetail> = {
  'sarah-marketing-consultant': {
    id: 'sarah-marketing-consultant',
    title: 'From Overwhelmed to Automated: 3x Revenue in 6 Months',
    client: 'Sarah Chen',
    business: 'Chen Marketing Solutions',
    industry: 'Marketing Consultant',
    duration: '6 months',
    heroImage: '/images/case-studies/sarah-hero.jpg',
    summary: 'Learn how Sarah transformed her solo marketing consultancy from a 60-hour work week into a streamlined, automated business that tripled revenue while cutting her hours in half.',
    challenge: {
      overview: 'Sarah was drowning in administrative tasks, spending only 40% of her time on billable client work. Despite her expertise, she couldn\'t scale beyond 4 clients without sacrificing quality or her personal life.',
      painPoints: [
        'Spending 25+ hours/week on admin and non-billable tasks',
        'Manually tracking time, invoices, and project status',
        'No standardized processes for client onboarding',
        'Turning away qualified leads due to capacity constraints',
        'Working weekends to keep up with deliverables'
      ]
    },
    solution: {
      overview: 'We implemented a comprehensive business transformation strategy focusing on automation, systematization, and strategic positioning.',
      strategies: [
        {
          title: 'Process Automation',
          description: 'Set up automated workflows for invoicing, time tracking, and client communication using integrated tools.',
          icon: '⚡'
        },
        {
          title: 'Service Productization',
          description: 'Transformed custom services into scalable packages with clear deliverables and pricing.',
          icon: '📦'
        },
        {
          title: 'Client Systems',
          description: 'Built a client portal for project management, reducing status meetings by 80%.',
          icon: '🎯'
        },
        {
          title: 'Strategic Positioning',
          description: 'Refined her niche and pricing strategy to attract higher-value clients.',
          icon: '💎'
        }
      ]
    },
    process: [
      {
        phase: 'Discovery & Audit (Weeks 1-2)',
        description: 'Conducted a comprehensive business audit to identify bottlenecks and opportunities.',
        outcomes: [
          'Mapped all business processes',
          'Identified 37 manual tasks for automation',
          'Analyzed profit margins by service type'
        ]
      },
      {
        phase: 'Systems Implementation (Weeks 3-8)',
        description: 'Rolled out automation tools and standardized processes across the business.',
        outcomes: [
          'Implemented CRM and project management system',
          'Created 12 workflow automations',
          'Developed service packages and pricing tiers'
        ]
      },
      {
        phase: 'Optimization & Scale (Weeks 9-24)',
        description: 'Fine-tuned systems and focused on strategic growth initiatives.',
        outcomes: [
          'Launched premium service tier',
          'Onboarded 8 new high-value clients',
          'Achieved consistent 35-hour work weeks'
        ]
      }
    ],
    results: [
      {
        metric: 'Revenue',
        before: '$8,500/month',
        after: '$26,500/month',
        improvement: '312% increase',
        icon: '💰'
      },
      {
        metric: 'Working Hours',
        before: '60-70 hours/week',
        after: '35 hours/week',
        improvement: '50% reduction',
        icon: '⏰'
      },
      {
        metric: 'Client Capacity',
        before: '4 clients max',
        after: '12 active clients',
        improvement: '3x increase',
        icon: '👥'
      },
      {
        metric: 'Profit Margin',
        before: '42%',
        after: '68%',
        improvement: '62% improvement',
        icon: '📈'
      }
    ],
    testimonial: {
      quote: 'Business of One didn\'t just help me work less - they helped me build a real business. I went from being a freelancer with a job to a CEO with systems. The best part? I\'m finally present for my family while earning more than ever.',
      author: 'Sarah Chen',
      role: 'Founder, Chen Marketing Solutions',
      image: '/images/case-studies/sarah-testimonial.jpg'
    },
    keyTakeaways: [
      'Automation can reclaim 25+ hours per week without sacrificing quality',
      'Productized services enable predictable revenue and easier scaling',
      'The right systems allow you to serve 3x more clients with less effort',
      'Strategic positioning can increase profit margins by 60%+'
    ],
    nextSteps: {
      title: 'Ready to Transform Your Business?',
      description: 'Sarah\'s transformation started with a single strategy session. Discover what\'s possible for your business.',
      cta: 'Book Your Free Strategy Session'
    }
  }
};

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const study = caseStudiesData[params.id];
  
  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4169E1] to-[#16A085] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-4xl">
            <Link 
              href="/case-studies"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Case Studies
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {study.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div>
                <span className="opacity-80">Client:</span> {study.client}
              </div>
              <div>
                <span className="opacity-80">Industry:</span> {study.industry}
              </div>
              <div>
                <span className="opacity-80">Timeline:</span> {study.duration}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-700 leading-relaxed">
            {study.summary}
          </p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Challenge</h2>
          <p className="text-lg text-gray-700 mb-8">
            {study.challenge.overview}
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <h3 className="font-semibold text-red-900 mb-4">Key Pain Points:</h3>
            <ul className="space-y-2">
              {study.challenge.painPoints.map((point, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-red-600 mt-1 mr-3">•</span>
                  <span className="text-red-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Solution</h2>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            {study.solution.overview}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {study.solution.strategies.map((strategy, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">{strategy.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {strategy.title}
                </h3>
                <p className="text-gray-700">
                  {strategy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Transformation Process</h2>
          <div className="space-y-12">
            {study.process.map((phase, idx) => (
              <div key={idx} className="relative pl-8 border-l-4 border-[#4169E1]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#4169E1] rounded-full" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {phase.phase}
                </h3>
                <p className="text-gray-700 mb-4">
                  {phase.description}
                </p>
                <ul className="space-y-2">
                  {phase.outcomes.map((outcome, oIdx) => (
                    <li key={oIdx} className="flex items-start text-gray-600">
                      <span className="text-[#16A085] mt-1 mr-3">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#4169E1] to-[#16A085] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">The Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {study.results.map((result, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{result.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{result.metric}</h3>
                <div className="text-white/70 text-sm mb-1">Before: {result.before}</div>
                <div className="text-2xl font-bold mb-1">After: {result.after}</div>
                <div className="text-yellow-300 font-semibold">{result.improvement}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 sm:p-12 rounded-2xl">
            <blockquote className="text-xl text-gray-700 italic leading-relaxed mb-6">
              "{study.testimonial.quote}"
            </blockquote>
            <div className="flex items-center">
              <div>
                <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                <div className="text-gray-600">{study.testimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Takeaways</h2>
          <div className="grid gap-4">
            {study.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start bg-white p-6 rounded-lg shadow">
                <span className="text-[#16A085] text-2xl mr-4 mt-1">💡</span>
                <p className="text-gray-700 text-lg">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#4169E1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {study.nextSteps.title}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {study.nextSteps.description}
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-white text-[#4169E1] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            {study.nextSteps.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}