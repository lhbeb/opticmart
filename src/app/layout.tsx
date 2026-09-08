import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ErrorBoundaryWrapper from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import { Suspense } from "react";
import VisitNotifier from "@/components/VisitNotifier";
import OptionalAnalytics from "@/components/OptionalAnalytics";
import { AdminRouteCheck, PublicRouteOnly, AdminRouteOnly, CheckoutRouteOnly } from "@/components/AdminRouteCheck";
import GlobalErrorReporter from "@/components/GlobalErrorReporter";
import LiveChatWidget from "@/components/LiveChatWidget";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpticMart - Premium Optics & Outdoor Gear",
  description: "Discover OpticMart. Explore premium optics, gear, and accessories for your next outdoor adventure.",
  keywords: "OpticMart, optics, scopes, outdoor gear, sporting goods",
  authors: [{ name: "OpticMart" }],
  creator: "OpticMart",
  publisher: "OpticMart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://opticmart.shop"),
  openGraph: {
    title: "OpticMart - Premium Optics & Outdoor Gear",
    description: "Explore OpticMart premium optics and outdoor gear.",
    url: "https://opticmart.shop",
    siteName: "OpticMart",
    images: [
      {
        url: "/opticmart-hero.png",
        width: 1536,
        height: 1024,
        alt: "OpticMart cameras, lenses, and binoculars",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpticMart - Premium Optics & Outdoor Gear",
    description: "Explore OpticMart premium optics and outdoor gear.",
    images: ["/opticmart-hero.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preload" href="/logosvg.svg" as="image" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning className={`${dmSans.variable} font-sans antialiased text-[#0F172A] bg-[#F8FAFC]`}>
        <GlobalErrorReporter />
        <PublicRouteOnly>
          <VisitNotifier />
        </PublicRouteOnly>
        {/* Organization Schema */}
        <AdminRouteCheck>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "OpticMart",
                "url": "https://opticmart.shop",
                "logo": "https://opticmart.shop/logosvg.svg",
                "description": "OpticMart - Premium Optics & Outdoor Gear.",
                "telephone": "+44 20 7946 0912",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+44 20 7946 0912",
                  "contactType": "customer service",
                  "areaServed": "GB",
                  "availableLanguage": ["en"],
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "17:30"
                  }
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "71-75 Shelton Street, Covent Garden",
                  "addressLocality": "London",
                  "postalCode": "WC2H 9JQ",
                  "addressCountry": "GB"
                }
              })
            }}
          />
        </AdminRouteCheck>

        {/* WebSite Schema */}
        <AdminRouteCheck>
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "OpticMart",
                "url": "https://opticmart.shop",
                "description": "OpticMart - Premium Optics & Outdoor Gear.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://opticmart.shop/api/products/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </AdminRouteCheck>

        <ErrorBoundaryWrapper>
          {/* Public website with header, footer, etc. */}
          <PublicRouteOnly>
            <div className="min-h-screen flex flex-col bg-white">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
              <Suspense fallback={null}>
                <InstagramSection />
              </Suspense>
              <NewsletterSection />
              <div className="h-4 bg-white md:h-6" aria-hidden="true" />
              <Footer />
            </div>
            <CookieConsent />
          </PublicRouteOnly>

          {/* Checkout page - navbar only, no distractions */}
          <CheckoutRouteOnly>
            <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
              <nav aria-label="Checkout policies" className="border-t border-[#0F172A]/10 bg-white px-4 py-5 text-center text-sm text-[#0F172A]">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  <a href="/shipping-policy" className="underline underline-offset-4">Shipping</a>
                  <a href="/return-policy" className="underline underline-offset-4">Returns</a>
                  <a href="/terms" className="underline underline-offset-4">Terms</a>
                  <a href="/contact" className="underline underline-offset-4">Contact</a>
                </div>
              </nav>
            </div>
          </CheckoutRouteOnly>

          {/* Admin dashboard - clean, no public UI */}
          <AdminRouteOnly>
            {children}
          </AdminRouteOnly>
        </ErrorBoundaryWrapper>

        <AdminRouteCheck><OptionalAnalytics /></AdminRouteCheck>
        <LiveChatWidget />
      </body>
    </html>
  );
}
