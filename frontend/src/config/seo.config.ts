export const siteConfig = {
  name: 'Business of One',
  shortName: 'BusinessOfOne',
  description: 'Transform Your Solo Business – Without Hiring. One-stop consulting and tools to run your business like a world-class company.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://businessofone.ai',
  ogImage: 'https://businessofone.ai/og-image.jpg',
  creator: 'Utlyze',
  keywords: [
    'solo business consulting',
    'one-person business',
    'business optimization',
    'growth strategy',
    'business automation',
    'solo entrepreneur',
    'business advisory',
    'small business consulting',
    'business transformation',
    'business audit'
  ],
  authors: [
    {
      name: 'Business of One',
      url: 'https://businessofone.ai',
    },
  ],
  mainNav: [
    {
      title: 'Services',
      href: '/#services',
    },
    {
      title: 'Features',
      href: '/#features',
    },
    {
      title: 'About',
      href: '/#about',
    },
    {
      title: 'Contact',
      href: '/#contact',
    },
  ],
}

export const openGraph = {
  type: 'website',
  locale: 'en_US',
  url: siteConfig.url,
  siteName: siteConfig.name,
  title: 'Transform Your Solo Business – Without Hiring | Business of One',
  description: siteConfig.description,
  images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: 'Business of One - Solo Business Consulting',
    },
  ],
}

export const twitter = {
  card: 'summary_large_image',
  title: openGraph.title,
  description: openGraph.description,
  images: [siteConfig.ogImage],
  creator: '@utlyze',
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    'https://twitter.com/utlyze',
    'https://linkedin.com/company/utlyze'
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US'
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127'
  },
  offers: {
    '@type': 'Offer',
    name: 'Free Business Strategy Session',
    description: 'Get a personalized business audit and growth strategy consultation',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
  },
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Business Consulting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Audit & Optimization',
          description: 'Comprehensive analysis of your business operations and optimization recommendations'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Growth Strategy Development',
          description: 'Custom growth strategies tailored for solo businesses'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automation Implementation',
          description: 'Set up systems and automation to scale without hiring'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ongoing Advisory Support',
          description: 'Continuous guidance and support for your business journey'
        }
      }
    ]
  }
}

export const getPageMetadata = (page: {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
  image?: string;
}) => {
  const title = page.title 
    ? `${page.title} | ${siteConfig.name}`
    : `${siteConfig.name} - Transform Your Solo Business`;
    
  const description = page.description || siteConfig.description;
  const keywords = page.keywords 
    ? [...siteConfig.keywords, ...page.keywords]
    : siteConfig.keywords;
  const image = page.image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      ...openGraph,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      ...twitter,
      title,
      description,
      images: [image],
    },
    robots: {
      index: !page.noIndex,
      follow: !page.noIndex,
      googleBot: {
        index: !page.noIndex,
        follow: !page.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};