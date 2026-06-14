import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import LenisProvider from "@/components/wedding/LenisProvider";
import "./globals.css";

// Premium elegant serif font for headings
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Modern clean sans font for body text
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// High-fidelity OpenGraph and SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://tilak-kavana-wedding.vercel.app"), // Default fallback domain
  title: "Wedding Invitation | Kavana & Tilak",
  description: "We invite you to celebrate the wedding ceremony of Kavana and Tilak. Join us in their beautiful journey of love.",
  keywords: ["Kavana Tilak Wedding", "Wedding Invitation", "Digital Wedding Card", "Indian Wedding Invitation"],
  authors: [{ name: "Kavana & Tilak" }],
  openGraph: {
    title: "Wedding Invitation | Kavana & Tilak",
    description: "You are cordially invited to celebrate the wedding of Kavana and Tilak. View event details, venues, and RSVP online.",
    type: "website",
    locale: "en_US",
    siteName: "Kavana & Tilak Wedding",
    images: [
      {
        url: "/wedding/Edited - 38.JPEG",
        width: 1200,
        height: 630,
        alt: "Kavana and Tilak Engagement shoot cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation | Kavana & Tilak",
    description: "You are cordially invited to celebrate the wedding of Kavana and Tilak.",
    images: ["/wedding/Edited - 38.JPEG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
      style={{ scrollBehavior: 'auto' }} // Lenis controls scrolling physics
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
