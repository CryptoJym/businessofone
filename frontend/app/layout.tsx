import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Business of One - Transform Your Solo Business',
  description: 'One-stop consulting and tools to run your business like a world-class company. Get expert guidance without hiring.',
  keywords: 'solo business, one-person business, business consulting, business growth, automation',
  authors: [{ name: 'Utlyze' }],
  openGraph: {
    title: 'Business of One - Transform Your Solo Business',
    description: 'One-stop consulting and tools to run your business like a world-class company.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}