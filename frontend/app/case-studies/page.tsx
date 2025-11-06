'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  testimonial: string;
  thumbnail: string;
  featured: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'sarah-marketing-consultant',
    title: 'From Overwhelmed to Automated: 3x Revenue in 6 Months',
    client: 'Sarah Chen',
    industry: 'Marketing Consultant',
    challenge: 'Spending 60% of time on admin tasks instead of client work',
    results: [
      { metric: 'Revenue Growth', value: '312%', improvement: 'in 6 months' },
      { metric: 'Time Saved', value: '25 hours', improvement: 'per week' },
      { metric: 'Client Capacity', value: '2x', improvement: 'without hiring' }
    ],
    testimonial: 'Business of One helped me see my business as a system, not just a job.',
    thumbnail: '',
    featured: true
  },
  {
    id: 'michael-web-developer',
    title: 'Solo Developer Scales to $250K Without Burning Out',
    client: 'Michael Rodriguez',
    industry: 'Web Development',
    challenge: 'Working 70+ hours/week with no clear growth path',
    results: [
      { metric: 'Annual Revenue', value: '$250K', improvement: 'from $80K' },
      { metric: 'Work Hours', value: '35/week', improvement: 'from 70+' },
      { metric: 'Profit Margin', value: '68%', improvement: 'from 35%' }
    ],
    testimonial: 'I finally have a business that works for me, not the other way around.',
    thumbnail: '',
    featured: true
  },
  {
    id: 'lisa-business-coach',
    title: 'Business Coach Doubles Impact with Strategic Systems',
    client: 'Lisa Thompson',
    industry: 'Business Coaching',
    challenge: 'Struggling to practice what she preached about scalability',
    results: [
      { metric: 'Client Results', value: '2.5x', improvement: 'average improvement' },
      { metric: 'Program Revenue', value: '$180K', improvement: 'recurring annually' },
      { metric: 'Waitlist', value: '45+', improvement: 'qualified leads' }
    ],
    testimonial: 'The strategies transformed not just my business, but my clients\' results too.',
    thumbnail: '',
    featured: false
  }
];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState<string>('all');
  
  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry))];
  const filteredStudies = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === filter);
  
  const featuredStudy = caseStudies.find(cs => cs.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Real Transformations, Real Results
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See how solo entrepreneurs like you have transformed their businesses 
              from overwhelming to optimized with Business of One
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-[#4169E1]/10 text-[#4169E1] px-6 py-3 rounded-full font-semibold">
                Average 3x Revenue Growth
              </div>
              <div className="bg-[#16A085]/10 text-[#16A085] px-6 py-3 rounded-full font-semibold">
                50% Less Time Working
              </div>
              <div className="bg-[#4169E1]/10 text-[#4169E1] px-6 py-3 rounded-full font-semibold">
                Zero Employees Needed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {featuredStudy && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="lg:grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1] to-[#16A085] opacity-90" />
                  <div className="relative z-10 h-full flex items-center justify-center p-8">
                    <div className="text-white text-center">
                      <p className="text-sm uppercase tracking-wider mb-2">Featured Success Story</p>
                      <h2 className="text-3xl font-bold mb-4">{featuredStudy.client}</h2>
                      <p className="text-lg opacity-90">{featuredStudy.industry}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredStudy.title}
                  </h3>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">The Challenge</p>
                    <p className="text-gray-700">{featuredStudy.challenge}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {featuredStudy.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-[#4169E1]">{result.value}</div>
                        <div className="text-xs text-gray-600">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                  <blockquote className="border-l-4 border-[#16A085] pl-4 mb-6 italic text-gray-700">
                    "{featuredStudy.testimonial}"
                  </blockquote>
                  <Link
                    href={`/case-studies/${featuredStudy.id}`}
                    className="inline-flex items-center text-[#4169E1] hover:text-[#16A085] font-semibold transition-colors"
                  >
                    Read Full Case Study
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-8" role="group" aria-label="Filter case studies by industry">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setFilter(industry)
                  }
                }}
                aria-pressed={filter === industry}
                className={`px-6 py-2 rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  filter === industry
                    ? 'bg-[#4169E1] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {industry === 'all' ? 'All Industries' : industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#4169E1] to-[#16A085]">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="font-semibold text-lg">{study.client}</p>
                      <p className="text-sm opacity-90">{study.industry}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4169E1] transition-colors">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {study.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-[#16A085]">{result.value}</span>
                        <span className="text-xs text-gray-600">{result.metric}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "{study.testimonial}"
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4169E1] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of solo entrepreneurs who've transformed their businesses
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-white text-[#4169E1] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Your Free Business Strategy Session
          </Link>
        </div>
      </section>
    </div>
  );
}