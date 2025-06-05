import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business of One - Transform Your Solo Business Without Hiring",
  description: "One-stop consulting and tools to run your business like a world-class company. Get strategies, systems, and support to scale your solo business efficiently.",
  keywords: "solo business, business consulting, business automation, one-person business, business growth, business strategy",
  openGraph: {
    title: "Business of One - Transform Your Solo Business Without Hiring",
    description: "One-stop consulting and tools to run your business like a world-class company.",
    url: "https://businessofone.ai",
    siteName: "Business of One",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
