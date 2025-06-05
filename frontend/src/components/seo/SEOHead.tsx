'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/seo.config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  article,
}: SEOHeadProps) {
  const pathname = usePathname();
  const url = `${siteConfig.url}${pathname}`;
  
  const pageTitle = title 
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - Transform Your Solo Business`;
    
  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.ogImage;
  const pageKeywords = keywords 
    ? [...siteConfig.keywords, ...keywords]
    : siteConfig.keywords;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteConfig.name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@utlyze" />
      <meta name="twitter:creator" content="@utlyze" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Article specific */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.authors?.map((author, index) => (
            <meta key={index} property="article:author" content={author} />
          ))}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Additional SEO Tags */}
      <meta name="author" content={siteConfig.creator} />
      <meta name="publisher" content={siteConfig.creator} />
      <meta name="copyright" content={siteConfig.name} />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="language" content="en" />
      
      {/* Mobile & PWA */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.shortName} />
      
      {/* Verification Tags (to be added when available) */}
      {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
      {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}
      {/* <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" /> */}
    </Head>
  );
}