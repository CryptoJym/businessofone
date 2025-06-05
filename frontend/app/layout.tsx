import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Optimize font loading with subsetting and display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Business of One - Transform Your Solo Business Without Hiring",
  description: "One-stop consulting and tools to run your business like a world-class company. Get your free business strategy session today.",
  keywords: ["solo business", "business consulting", "one-person business", "business growth", "business automation"],
  authors: [{ name: "Utlyze" }],
  creator: "Utlyze",
  publisher: "Utlyze",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Business of One - Transform Your Solo Business",
    description: "One-stop consulting and tools to run your business like a world-class company",
    url: "https://businessofone.ai",
    siteName: "Business of One",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Business of One - Solo Business Growth",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business of One - Transform Your Solo Business",
    description: "One-stop consulting and tools to run your business like a world-class company",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        {/* Main app content */}
        {children}
        
        {/* Analytics and monitoring scripts loaded with afterInteractive strategy */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              if ('web-vital' in window) {
                window.addEventListener('load', () => {
                  function sendToAnalytics({name, delta, id}) {
                    // Send to your analytics endpoint
                    console.log({name, delta, id});
                  }
                  
                  webVitals.onCLS(sendToAnalytics);
                  webVitals.onFID(sendToAnalytics);
                  webVitals.onFCP(sendToAnalytics);
                  webVitals.onLCP(sendToAnalytics);
                  webVitals.onTTFB(sendToAnalytics);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
