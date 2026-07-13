import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://businessofone.ai"),
  title: "Business of One | A 90-day operating plan for solo owners",
  description:
    "Find the constraint, choose the highest-leverage moves, and build a focused 90-day operating plan without adding payroll.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Business of One",
    description:
      "A focused operating system for solo owners who want more leverage without more payroll.",
    url: "/",
    siteName: "Business of One",
    type: "website",
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
