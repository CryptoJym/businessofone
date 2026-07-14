import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://businessofone.ai"),
  title: "Business of One | The AI operating system for solo owners",
  description:
    "Use supervised AI across growth, sales, delivery, finance, and operations while you keep judgment, control, and a clear 90-day plan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Business of One",
    description:
      "A supervised AI operating system for solo owners who want more leverage without more payroll.",
    url: "/",
    siteName: "Business of One",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Business of One",
    description:
      "The one-person AI operating system for growth, sales, delivery, and operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061426",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
