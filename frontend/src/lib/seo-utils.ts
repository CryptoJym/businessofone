import { siteConfig } from '@/config/seo.config';

/**
 * Generate organization schema for structured data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Utlyze',
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      'https://twitter.com/utlyze',
      'https://linkedin.com/company/utlyze'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: 'English'
    }
  };
}

/**
 * Generate FAQ schema for structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate How-To schema for structured data
 */
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  totalTime: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image })
    }))
  };
}

/**
 * Generate Review schema for structured data
 */
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  review: string;
  datePublished: string;
}>) {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: siteConfig.name,
    description: siteConfig.description,
    aggregateRating,
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.datePublished,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.review
    }))
  };
}

/**
 * Generate Event schema for structured data
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address?: string;
  };
  organizer: string;
  image?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': event.location.address ? 'Place' : 'VirtualLocation',
      name: event.location.name,
      ...(event.location.address && {
        address: {
          '@type': 'PostalAddress',
          streetAddress: event.location.address
        }
      }),
      ...(event.url && { url: event.url })
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
      url: siteConfig.url
    },
    ...(event.image && { image: event.image }),
    ...(event.url && { url: event.url })
  };
}

/**
 * Clean and truncate text for meta descriptions
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]*>/g, '');
  
  // Trim whitespace
  const trimmed = cleanText.trim();
  
  // If under limit, return as is
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  
  // Truncate to nearest word boundary
  const truncated = trimmed.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageURL(params: {
  title: string;
  description?: string;
  theme?: 'light' | 'dark';
}): string {
  // This could integrate with a dynamic OG image service
  // For now, returns the static OG image
  return siteConfig.ogImage;
}

/**
 * Format canonical URL
 */
export function formatCanonicalURL(path: string): string {
  // Remove trailing slashes
  const cleanPath = path.replace(/\/+$/, '');
  
  // Ensure path starts with /
  const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  // Remove duplicate slashes
  const finalPath = formattedPath.replace(/\/+/g, '/');
  
  return `${siteConfig.url}${finalPath}`;
}

/**
 * Generate hreflang tags for internationalization
 */
export function generateHreflangTags(currentPath: string, locales: string[]): Array<{
  lang: string;
  href: string;
}> {
  return locales.map(locale => ({
    lang: locale,
    href: `${siteConfig.url}/${locale}${currentPath}`
  }));
}

/**
 * Validate and clean meta keywords
 */
export function validateKeywords(keywords: string[]): string[] {
  return keywords
    .filter(keyword => keyword && keyword.trim().length > 0)
    .map(keyword => keyword.trim().toLowerCase())
    .filter((keyword, index, self) => self.indexOf(keyword) === index) // Remove duplicates
    .slice(0, 10); // Limit to 10 keywords
}

/**
 * Generate social media meta tags
 */
export function generateSocialMetaTags(params: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    // Open Graph
    'og:title': params.title,
    'og:description': params.description,
    'og:image': params.image,
    'og:url': params.url,
    'og:type': 'website',
    'og:site_name': siteConfig.name,
    
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:title': params.title,
    'twitter:description': params.description,
    'twitter:image': params.image,
    'twitter:site': '@utlyze',
    
    // LinkedIn
    'linkedin:owner': 'utlyze',
    
    // Pinterest
    'pinterest:description': params.description,
    'pinterest:media': params.image
  };
}