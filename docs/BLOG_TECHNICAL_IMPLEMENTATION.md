# Blog Technical Implementation Guide

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing page
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Individual blog post
│   │   │   ├── category/
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx      # Category listing
│   │   │   ├── tag/
│   │   │   │   └── [tag]/
│   │   │   │       └── page.tsx      # Tag listing
│   │   │   ├── feed.xml/
│   │   │   │   └── route.ts          # RSS feed
│   │   │   └── sitemap.ts            # Blog sitemap
│   │   └── api/
│   │       └── blog/
│   │           ├── posts/
│   │           │   └── route.ts       # Blog posts API
│   │           ├── search/
│   │           │   └── route.ts       # Search API
│   │           └── subscribe/
│   │               └── route.ts       # Newsletter subscription
│   ├── components/
│   │   └── blog/
│   │       ├── BlogCard.tsx          # Blog post card component
│   │       ├── BlogPost.tsx          # Full blog post component
│   │       ├── AuthorBio.tsx         # Author information
│   │       ├── CategoryTag.tsx       # Category/tag component
│   │       ├── ShareButtons.tsx      # Social sharing
│   │       ├── RelatedPosts.tsx      # Related posts section
│   │       ├── NewsletterCTA.tsx     # Newsletter signup
│   │       ├── Comments.tsx          # Comments section
│   │       └── CalloutBox.tsx        # Callout component
│   └── lib/
│       └── blog/
│           ├── contentLayer.ts       # MDX processing
│           ├── types.ts              # TypeScript types
│           ├── utils.ts              # Utility functions
│           └── analytics.ts          # Analytics tracking
content/
├── blog/                             # Blog posts in MDX
├── authors/                          # Author profiles
└── categories/                       # Category definitions
```

## Dependencies

```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@next/mdx": "^14.0.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "reading-time": "^1.5.0",
    "rehype-highlight": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "algoliasearch": "^4.20.0",
    "react-intersection-observer": "^9.5.3",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

## Core Implementation Files

### 1. Content Layer (`lib/blog/contentLayer.ts`)

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import { BlogPost, Category, Author } from './types';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(POSTS_PATH);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(POSTS_PATH, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);
        
        const readTime = readingTime(content);
        
        return {
          ...data,
          slug: file.replace('.mdx', ''),
          readingTime: Math.ceil(readTime.minutes),
          content: content,
        } as BlogPost;
      })
  );
  
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [[require('remark-gfm')]],
        rehypePlugins: [
          [require('rehype-slug')],
          [require('rehype-highlight')],
        ],
      },
    });
    
    const readTime = readingTime(content);
    
    return {
      ...data,
      slug,
      content: mdxSource,
      readingTime: Math.ceil(readTime.minutes),
    } as BlogPost;
  } catch (error) {
    return null;
  }
}
```

### 2. Blog Types (`lib/blog/types.ts`)

```typescript
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  category: Category;
  tags: Tag[];
  readingTime: number;
  seo: SEOMetadata;
  relatedPosts: string[];
}
```

### 3. Blog Listing Page (`app/blog/page.tsx`)

```typescript
import { getAllPosts } from '@/lib/blog/contentLayer';
import { BlogCard } from '@/components/blog/BlogCard';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';

export const metadata = {
  title: 'Blog | Business of One',
  description: 'Insights and strategies for solo business owners to transform their operations and scale without hiring.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featuredPosts = posts.filter(post => post.featured);
  const recentPosts = posts.filter(post => !post.featured).slice(0, 9);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Insights for Solo Business Success
        </h1>
        
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <NewsletterCTA 
          title="Never Miss an Update"
          description="Get weekly insights on growing your solo business delivered to your inbox."
        />
      </div>
    </div>
  );
}
```

### 4. Individual Blog Post (`app/blog/[slug]/page.tsx`)

```typescript
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog/contentLayer';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { CalloutBox } from '@/components/blog/CalloutBox';

const components = {
  NewsletterCTA,
  CalloutBox,
  // Add more custom components here
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(', '),
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await Promise.all(
    post.relatedPosts.map(slug => getPostBySlug(slug))
  );

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <div>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
              <span className="mx-2">•</span>
              <span>{post.readingTime} min read</span>
            </div>
            <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <MDXRemote source={post.content} components={components} />
        </div>

        <AuthorBio author={post.author} />

        <div className="my-12">
          <NewsletterCTA 
            title="Enjoyed this article?"
            description="Get more insights like this delivered to your inbox."
          />
        </div>

        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts.filter(Boolean)} />
        )}
      </div>
    </article>
  );
}
```

### 5. Blog API Route (`app/api/blog/posts/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog/contentLayer';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');

  try {
    let posts = await getAllPosts();

    // Filter by category
    if (category) {
      posts = posts.filter(post => post.category.slug === category);
    }

    // Filter by tag
    if (tag) {
      posts = posts.filter(post => 
        post.tags.some(t => t.slug === tag)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: posts.length,
        totalPages: Math.ceil(posts.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
```

## SEO Implementation

### 1. Sitemap Generation (`app/blog/sitemap.ts`)

```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/contentLayer';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const blogPosts = posts.map((post) => ({
    url: `https://businessofone.ai/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  return [
    {
      url: 'https://businessofone.ai/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
```

### 2. RSS Feed (`app/blog/feed.xml/route.ts`)

```typescript
import { getAllPosts } from '@/lib/blog/contentLayer';
import RSS from 'rss';

export async function GET() {
  const posts = await getAllPosts();

  const feed = new RSS({
    title: 'Business of One Blog',
    description: 'Insights and strategies for solo business owners',
    site_url: 'https://businessofone.ai',
    feed_url: 'https://businessofone.ai/blog/feed.xml',
    language: 'en',
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://businessofone.ai/blog/${post.slug}`,
      date: new Date(post.publishedAt),
      author: post.author.name,
      categories: [post.category.name, ...post.tags.map(t => t.name)],
    });
  });

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

## Performance Optimizations

1. **Static Generation**: All blog posts are statically generated at build time
2. **ISR**: Implement Incremental Static Regeneration for updates
3. **Image Optimization**: Use Next.js Image component with lazy loading
4. **Code Splitting**: MDX components are dynamically imported
5. **Caching**: Implement proper cache headers for API routes

## Analytics Integration

```typescript
// lib/blog/analytics.ts
export function trackBlogView(slug: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: `/blog/${slug}`,
      content_type: 'blog_post',
    });
  }
}

export function trackCTAClick(ctaName: string, postSlug: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      post_slug: postSlug,
      content_type: 'blog_post',
    });
  }
}
```

This implementation provides a solid foundation for a high-performance, SEO-optimized blog that can scale with the Business of One platform.