import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OfflineState } from "@/components/ui/states";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Business of One - Transform Your Solo Business",
  description: "One-stop consulting and tools to run your business like a world-class company. Get business audit, growth strategy, and automation implementation.",
  keywords: "solo business, business consulting, business automation, growth strategy, one person business",
  openGraph: {
    title: "Business of One - Transform Your Solo Business",
    description: "One-stop consulting and tools to run your business like a world-class company",
    url: "https://businessofone.ai",
    siteName: "Business of One",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <OfflineState />
      </body>
    </html>
  );
}
