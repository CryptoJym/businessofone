import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Business of One',
  description: 'Learn about Business of One and our mission to empower solo entrepreneurs with world-class business strategies and tools.',
  openGraph: {
    title: 'About Business of One',
    description: 'Discover how we help solo entrepreneurs transform their businesses without hiring.',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}