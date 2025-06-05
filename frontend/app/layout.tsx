import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieConsentBanner from '@/components/CookieConsentBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business of One - Transform Your Solo Business',
  description: 'One-stop consulting and tools to run your business like a world-class company. Transform your solo business without hiring.',
  keywords: 'solo business, business consulting, business optimization, one-person business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}