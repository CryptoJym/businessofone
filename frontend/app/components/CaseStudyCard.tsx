'use client';

import Link from 'next/link';

interface CaseStudyCardProps {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge?: string;
  results: {
    metric: string;
    value: string;
    improvement?: string;
  }[];
  testimonial: string;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export default function CaseStudyCard({
  id,
  title,
  client,
  industry,
  challenge,
  results,
  testimonial,
  variant = 'default',
  className = ''
}: CaseStudyCardProps) {
  
  if (variant === 'compact') {
    return (
      <Link
        href={`/case-studies/${id}`}
        className={`block bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 ${className}`}
      >
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 group-hover:text-[#4169E1] transition-colors">
            {client}
          </h3>
          <p className="text-sm text-gray-600">{industry}</p>
        </div>
        <div className="flex items-center gap-4 mb-3">
          {results.slice(0, 2).map((result, idx) => (
            <div key={idx}>
              <span className="text-xl font-bold text-[#16A085]">{result.value}</span>
              <span className="text-xs text-gray-600 ml-1">{result.metric}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 italic line-clamp-2">
          "{testimonial}"
        </p>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
        <div className="lg:grid lg:grid-cols-2">
          <div className="relative h-64 lg:h-full bg-gradient-to-br from-[#4169E1] to-[#16A085]">
            <div className="absolute inset-0 flex items-center justify-center text-white p-8">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Success Story</p>
                <h3 className="text-3xl font-bold mb-2">{client}</h3>
                <p className="text-lg opacity-90">{industry}</p>
              </div>
            </div>
          </div>
          <div className="p-8 lg:p-10">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              {title}
            </h4>
            {challenge && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Challenge</p>
                <p className="text-gray-700">{challenge}</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {results.slice(0, 3).map((result, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-[#4169E1]">{result.value}</div>
                  <div className="text-xs text-gray-600">{result.metric}</div>
                </div>
              ))}
            </div>
            <blockquote className="border-l-4 border-[#16A085] pl-4 mb-6 italic text-gray-700">
              "{testimonial}"
            </blockquote>
            <Link
              href={`/case-studies/${id}`}
              className="inline-flex items-center text-[#4169E1] hover:text-[#16A085] font-semibold transition-colors"
            >
              Read Full Story
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <Link
      href={`/case-studies/${id}`}
      className={`group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${className}`}
    >
      <div className="relative h-48 bg-gradient-to-br from-[#4169E1] to-[#16A085]">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <p className="font-semibold text-lg">{client}</p>
            <p className="text-sm opacity-90">{industry}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4169E1] transition-colors">
          {title}
        </h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {results.slice(0, 2).map((result, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-2xl font-bold text-[#16A085]">{result.value}</span>
              <span className="text-xs text-gray-600">{result.metric}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-sm italic">
          "{testimonial}"
        </p>
      </div>
    </Link>
  );
}